import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../../state/customers.service';
import { UserService } from '../../state/user.service';
import { ConfigService } from 'src/app/standlone/state/config.service';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ICountry } from '../../models/country';
import { JobService } from '../../state/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  newUserForm!: FormGroup;
  public selectedOptions: string[] = [];
  @ViewChild('peopleInput') peopleInput!: ElementRef;
  public separatorKeysCodes: number[] = [COMMA, ENTER];
  public addOnBlur: boolean = false;
  public filteredSkillsList!: Observable<any[]>;
  public permissionsList = [
    {
      viewValue: 'Silver',
      value: 'silver',
    },
    {
      viewValue: 'Gold',
      value: 'gold',
    },
    {
      viewValue: 'Platinum',
      value: 'platinum',
    },
  ];
  usersList: any;
  visaOptions: any;
  options!: Observable<any[]>;
  public myControl = new FormControl('');

  public filteredOptions!: Observable<any[]>;
  public filteredStatesOptions!: Observable<any[]>;
  public filteredCitiesOptions!: Observable<any[]>;

  public countriesList!: ICountry[];

  statesList!: any[];
  selectedCountryCode!: string[];
  citiesList!: any[];

  get isActive() {
    return this.newUserForm.get('isActive') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private custService: CustomersService,
    private configService: ConfigService,
    private query: authQuery,
    public router: Router
  ) {
    this.newUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: [{ value: 'employee', disabled: true }],
      isActive: [true],
      vendorId: [this.query.currentUserInfo?._id],
      skills: ['', [Validators.required]],
      experience: [, [Validators.required]],
      visaStatus: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });

    this.myControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        if (value?.length >= 3) {
          this.filteredSkillsList = this.custService.searchSkills(value);
        }
      });
  }

  ngOnInit(): void {
    this.getCountriesList();
    this.getVisaConfig();
    this.filteredOptions = this.newUserForm.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): ICountry[] {
    const filterValue = value.toLowerCase();

    return this.countriesList?.filter((option) =>
      option?.name.toLowerCase().includes(filterValue)
    );
  }

  remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }

    this.newUserForm.patchValue({
      skills: this.selectedOptions,
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    this.peopleInput.nativeElement.value = '';
    this.newUserForm.patchValue({
      skills: this.selectedOptions,
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedOptions.push(value);
    }

    event.input.value = '';
    this.newUserForm.patchValue({
      skills: this.selectedOptions,
    });
  }

  get f(): any {
    return this.newUserForm.controls;
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.newUserForm?.controls[controlName].hasError(errorName);
  };

  onSubmit(): void {
    if (this.newUserForm.valid) {
      this.custService
        .createNewCust(this.newUserForm.value)
        .subscribe((response) => {
          // this.dialogRef.close(true);
          setTimeout(() => {
            this.onCancel();
          }, 1000);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  public close() {
    // this.dialogRef.close(false);
  }

  private getVisaConfig() {
    this.configService.getVisaOptions().subscribe((data: any) => {
      this.visaOptions = data;
    });
  }

  public filterUsersList(selectedValue: string) {
    // this.selectedItem = selectedValue;
    this.usersList = this.usersList.filter(
      (item: any) => item?._id !== selectedValue
    );
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
          this.filteredStatesOptions = this.newUserForm.controls[
            'state'
          ].valueChanges.pipe(
            startWith(''),
            map((value) => this.filterStates(value || ''))
          );
        });
    }
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
          this.filteredCitiesOptions = this.newUserForm.controls[
            'city'
          ].valueChanges.pipe(
            startWith(''),
            map((value) => this.filterCities(value || ''))
          );
        });
    }
  }

  public onCancel() {
    this.router.navigateByUrl('/home/employees');
  }
}
