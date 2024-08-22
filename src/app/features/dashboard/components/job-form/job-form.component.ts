import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { JobService } from '../../state/job.service';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ICountry } from '../../models/country';
import { IState } from '../../models/state';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CustomersService } from '../../state/customers.service';
import { ConfigService } from 'src/app/standlone/state/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent implements OnInit {
  public jobForm!: FormGroup;

  // have to move them to API
  public jobTypeOptions = [
    {
      viewValue: 'Full Time',
      value: 'full-time',
    },
    {
      viewValue: 'Part Time',
      value: 'part-time',
    },
    {
      viewValue: 'Contract (C2H)',
      value: 'contract',
    },
    {
      viewValue: 'Freelance',
      value: 'freelance',
    },
    {
      viewValue: 'Internship',
      value: 'internship',
    },
    {
      viewValue: 'Volunteer',
      value: 'volunteer',
    },
  ];

  public workPlaceTypeOptions = [
    {
      viewValue: 'On site',
      value: 'on-site',
    },
    {
      viewValue: 'Remote',
      value: 'remote',
    },
    {
      viewValue: 'Hybrid',
      value: 'hybrid',
    },
  ];

  public filteredOptions!: Observable<any[]>;
  public filteredStatesOptions!: Observable<any[]>;
  public filteredCitiesOptions!: Observable<any[]>;

  public countriesList!: ICountry[];

  statesList!: any[];
  selectedCountryCode!: string[];
  citiesList!: any[];

  public skillsCtrl = new FormControl('');
  public selectedOptions: string[] = [];
  public separatorKeysCodes: number[] = [COMMA, ENTER];
  public addOnBlur: boolean = false;
  @ViewChild('peopleInput') peopleInput!: ElementRef;
  public filteredSkillsList!: Observable<any[]>;

  get f() {
    return this.jobForm.controls;
  }

  get experinceForm() {
    return this.jobForm.controls['experience'] as FormGroup;
  }

  get compensationForm() {
    return this.jobForm.controls['compensation'] as FormGroup;
  }

  get locationForm() {
    return this.jobForm.controls['jobLocation'] as FormGroup;
  }

  constructor(
    public fb: FormBuilder,
    private jobService: JobService,
    public query: authQuery,
    private custService: CustomersService,
    private configService: ConfigService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.initJobForm();
  }

  ngOnInit(): void {
    this.getCountriesList();
    this.getDepartmentOptions();
    this.filteredOptions = this.locationForm.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.skillsCtrl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        if (value?.length >= 3) {
          this.filteredSkillsList = this.custService.searchSkills(value);
        }
      });
  }

  private getDepartmentOptions() {
    this.configService.getDepartmentOptions().subscribe();
  }

  private _filter(value: string): ICountry[] {
    const filterValue = value.toLowerCase();

    return this.countriesList?.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  private filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.statesList?.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  private filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.citiesList?.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  private getCountriesList() {
    this.jobService.getCountriesList().subscribe((response) => {
      this.countriesList = response;
    });
  }

  public onCountrySelection(event: MatAutocompleteSelectedEvent) {
    this.selectedCountryCode = this.countriesList
      .filter(
        (x) => x.name.toLowerCase() === event?.option?.viewValue.toLowerCase()
      )
      .map((y) => y?.iso2);

    if (this.selectedCountryCode) {
      this.jobService
        .getStatesListByCountry(this.selectedCountryCode[0])
        .subscribe((response) => {
          this.statesList = response;
          this.filteredStatesOptions = this.locationForm.controls[
            'state'
          ].valueChanges.pipe(
            startWith(''),
            map((value) => this.filterStates(value || ''))
          );
        });
    }
  }

  public onStateSelection(event: MatAutocompleteSelectedEvent) {
    const selectedStateCode = this.statesList
      .filter(
        (x) => x.name.toLowerCase() === event?.option?.viewValue.toLowerCase()
      )
      .map((y) => y?.iso2);

    if (selectedStateCode) {
      this.jobService
        .getCitiesListByCountry(
          this.selectedCountryCode[0],
          selectedStateCode[0]
        )
        .subscribe((response) => {
          this.citiesList = response;
          this.filteredCitiesOptions = this.locationForm.controls[
            'city'
          ].valueChanges.pipe(
            startWith(''),
            map((value) => this.filterCities(value || ''))
          );
        });
    }
  }

  private initJobForm() {
    this.jobForm = this.fb.group({
      createdBy: [this.query.currentUserInfo?._id],
      jobTitle: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
      responsibilities: [''],
      hiringManager: [this.query.currentUserInfo?._id],
      jobType: ['', [Validators.required]],
      experience: this.fb.group({
        min: [[Validators.required]],
        max: [[Validators.required]],
      }),
      jobLocation: this.fb.group({
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }),
      workPlaceType: ['', [Validators.required]],
      compensation: this.fb.group({
        currencyType: ['', [Validators.required]],
        min: [[Validators.required]],
        max: [[Validators.required]],
      }),
      skills: [[], [Validators.required]],
      department: ['', [Validators.required]],
    });
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.jobForm?.controls[controlName].hasError(errorName);
  };

  public checkExperienceError = (controlName: string, errorName: string) => {
    return this.experinceForm?.controls[controlName].hasError(errorName);
  };

  public checkSalaryError = (controlName: string, errorName: string) => {
    return this.compensationForm?.controls[controlName].hasError(errorName);
  };

  public checkLocationError = (controlName: string, errorName: string) => {
    return this.locationForm?.controls[controlName].hasError(errorName);
  };

  remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }

    this.jobForm.patchValue({
      skills: this.selectedOptions,
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedOptions.push(value);
    }

    event.input.value = '';
    this.jobForm.patchValue({
      skills: this.selectedOptions,
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    this.peopleInput.nativeElement.value = '';
    this.jobForm.patchValue({
      skills: this.selectedOptions,
    });
  }

  public close() {
    this.router.navigateByUrl('home/jobs');
  }

  public onSubmit() {
    console.log(this.jobForm.valid);

    if (this.jobForm.valid) {
      this.jobService.publishNewJob(this.jobForm.value).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success(response?.message);
          this.router.navigateByUrl('home/jobs');
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      return;
    }
  }
}
