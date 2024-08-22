import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/features/auth/models/user.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CustomersService } from '../../state/customers.service';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { IEmployee } from '../../models/employee';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { Router } from '@angular/router';
import { DatelogdialogComponent } from 'src/app/shared/components/datelogdialog/datelogdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment-timezone';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public resultsLength = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [10, 20, 50, 100, 150, 200];
  public pageEvent!: PageEvent;

  public availabilityFilterOption = [
    {
      viewValue: 'All Employees',
      value: '',
    },
    {
      viewValue: 'Available',
      value: 'available',
    },
    {
      viewValue: 'Unavailable',
      value: 'unavailable',
    },
  ];

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'createdAt',
    'isActive',
    'experience',
    'action',
  ];
  dataSource = new MatTableDataSource<User>([]);
  public usersList!: any[];
  public searchCtrl = new FormControl('');
  public availabilityFilterCtrl = new FormControl(
    this.availabilityFilterOption[0].value
  );
  pagedCards: any;

  constructor(
    public dialog: MatDialog,
    private service: CustomersService,
    private toastr: ToastrService,
    private query: authQuery,
    private router: Router,
    public spinner: NgxSpinnerService
  ) {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        this.getUserData();
      });

    this.availabilityFilterCtrl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        this.getUserData();
      });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public pageChanged(event: PageEvent) {
    // // if (event.pageSize < event.length) {
    // this.pageSize = event.pageSize;
    // this.currentPage = event.pageIndex;
    // this.getReportsGridData(
    //   this.selectedTeam,
    //   this.selectedDuration,
    //   this.currentPage,
    //   this.pageSize
    // );
    // }
  }

  public addUser() {
    this.router.navigateByUrl('/home/employee/new');
  }

  private getUserData() {
    this.spinner.show();
    const vendorId = sessionStorage.getItem('id')!;
    this.service
      .getEmployeesList(this.currentPage, this.pageSize, {
        vendorId: vendorId,
        availabilityFilterOption: this.availabilityFilterCtrl?.value,
        searchKey: this.searchCtrl?.value,
      })
      .subscribe(
        (data: any) => {
          this.resultsLength = data?.response?.data.length;
          this.usersList = data?.response?.data;
          this.setPagedCards(this.currentPage, this.pageSize);
          this.dataSource.paginator = this.paginator;
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

  private setPagedCards(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.pagedCards = this.usersList.slice(startIndex, endIndex);
  }

  private handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.setPagedCards(event.pageIndex, event.pageSize);
  }

  public getChipColor(userRole: string) {
    switch (userRole) {
      case 'platinum':
        return 'custom-chip admin-chip';

      case 'gold':
        return 'custom-chip creator-chip';

      case 'checker':
        return 'custom-chip checker-chip';

      case 'user':
        return 'custom-chip user-chip';

      default:
        return 'custom-chip';
    }
  }

  public deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        headerText: 'Delete User',
        message: 'Are you sure you want to delete the user?',
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        // this.userService.deleteUser(user).subscribe((response) => {
        //   this.toastr.success(response?.message);
        //   this.getUserData();
        // });
      }
    });
  }

  public editUser(user: User) {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      data: user,
      width: '380px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getUserData();
      }
    });
  }

  public viewUser(user: User) {
    const dialogRef = this.dialog.open(CustomerDetailsComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getUserData();
      }
    });
  }

  public openEmpDetails(empDetails: any) {
    this.router.navigateByUrl(`home/employees/${empDetails?._id}`);
  }

  public openDatesLogDialog(employeeInfo: any) {
    const dialogRef = this.dialog.open(DatelogdialogComponent, {
      data: employeeInfo,
      width: '480px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getUserData();
      }
    });
  }
}
