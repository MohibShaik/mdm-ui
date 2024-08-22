import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { JobService } from '../../state/job.service';
import { ConfigService } from 'src/app/standlone/state/config.service';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import { CustomersService } from '../../state/customers.service';
import { ToastrService } from 'ngx-toastr';
import { IJob } from '../../models/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  public resultsLength = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [10, 20, 50, 100, 150, 200];

  public vendorId = new FormControl('');
  public workPlaceType = new FormControl([]);
  public jobType = new FormControl([]);
  public department = new FormControl([]);

  // todo
  public vendorOptions = [
    {
      viewValue: 'All Jobs',
      value: '',
    },
    {
      viewValue: 'My Jobs',
      value: this.query.currentUserInfo?._id,
    },
  ];

  public workPlaceOptions = [
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

  public employementTypeOption = [
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

  public departmentOptions = [
    {
      viewValue: 'Human Resources (HR)',
      value: 'Human Resources',
    },
    {
      viewValue: 'Finance/Accounting',
      value: 'Finance/Accounting',
    },
    {
      viewValue: 'Sales',
      value: 'Sales',
    },
    {
      viewValue: 'Marketing',
      value: 'Marketing',
    },
    {
      viewValue: 'Information Technology (IT)',
      value: 'Information Technology (IT)',
    },
    {
      viewValue: 'Customer Service',
      value: 'Customer Service',
    },
    {
      viewValue: 'Product Management',
      value: 'Product Management',
    },
    {
      viewValue: 'Quality Assurance (QA)',
      value: 'Quality Assurance (QA)',
    },
    {
      viewValue: 'Engineering',
      value: 'Engineering',
    },
  ];
  jobsList: any;
  public hasEmployees = false;

  constructor(
    private spinner: NgxSpinnerService,
    public query: authQuery,
    private jobService: JobService,
    private configService: ConfigService,
    public customerSerice: CustomersService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.vendorId.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.getJobsList();
      });

    this.workPlaceType.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.getJobsList();
      });

    this.jobType.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.getJobsList();
      });

    this.department.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.getJobsList();
      });
  }

  ngOnInit(): void {
    this.getJobsList();
    this.getEmpByVendorId();
  }

  private getJobsList() {
    this.spinner.show();
    this.jobService
      .getJobsList(this.currentPage, this.pageSize, {
        vendorId: this.vendorId?.value,
        workPlaceType: this.workPlaceType?.value,
        jobType: this.jobType?.value,
        department: this.department?.value,
      })
      .subscribe(
        (data: any) => {
          this.resultsLength = data?.response?.data.length;
          this.jobsList = data?.response?.data;
          if (this.jobsList.length) {
            this.jobsList.forEach((job: IJob) => {
              this.applicationStatus(job);
            });
          }
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        }
      );
  }

  private getFilters() {
    this.configService.getJobFilters().subscribe();
  }

  public getPageHeaderText(): string {
    const result =
      this.vendorId?.value === this.query.currentUserInfo?._id
        ? 'My Jobs (Published by you)'
        : 'Recommended Jobs';

    return result;
  }

  public getChipColorCode() {
    const chipsList = [
      'custom-chip admin-chip',
      'custom-chip creator-chip',
      'custom-chip checker-chip',
      'custom-chip user-chip',
    ];

    const colorCode = this.getRandomString(chipsList);
    return colorCode;
  }

  private getRandomString(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  public getConnectEligibility(jobCreator: string): boolean {
    return this.query.currentUserInfo?._id !== jobCreator;
  }

  public applicationStatus(job: IJob): void {
    const isJobApplied = job.applicants?.filter(
      (x) => x?.applicant === this.query.currentUserInfo?._id
    );

    job.isApplied = isJobApplied?.length ? true : false;
  }

  public addUser() {
    this.router.navigateByUrl('/home/job/new');
  }

  public onConnectClick(job: IJob): void {
    if (this.hasEmployees) {
      const jobInfo = {
        job: job?._id,
        applicant: this.query.currentUserInfo?._id,
      };
      this.jobService.applyForJob(jobInfo).subscribe((response) => {
        this.toastr.success(response?.message);
      });
    } else {
      this.toastr.error(
        "Sorry, You don't have employees to apply for the job."
      );
    }
  }

  private getEmpByVendorId(): void {
    this.customerSerice
      .getEmpByVendorId(this.query.currentUserInfo?._id)
      .subscribe((response) => {
        this.hasEmployees = !!response?.data.length;
      });
  }
}
