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
  constructor(
    public dialog: MatDialog,
    private service: CustomersService,
    private toastr: ToastrService,
    private query: authQuery
  ) {}

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
    const dialogRef = this.dialog.open(CustomerFormComponent, {});
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getUserData();
      }
    });
  }

  private getUserData() {
    this.service
      .getEmployeesList(this.currentPage, this.pageSize, {
        vendorId: this.query.currentUserInfo?._id,
      })
      .subscribe((data: any) => {
        this.resultsLength = data?.response?.data.length;
        this.usersList = data?.response?.data;
        this.dataSource.paginator = this.paginator;
      });
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
}
