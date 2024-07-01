import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';
import { UserService } from '../../state/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/features/auth/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

// const ELEMENT_DATA: any[] = [
//   {
//     position: 1,
//     username: 'Jenny wilson',
//     email: 'jenny.wilson@gmail.com',
//     status: 'active',
//     permissions: 'Manager',
//   },

//   {
//     position: 2,
//     username: 'Andy Flower',
//     email: 'andy.flower@gmail.com',
//     status: 'active',
//     permissions: 'Admin',
//   },

//   {
//     position: 3,
//     username: 'Robert Fox',
//     email: 'robert.fox@gmail.com',
//     status: 'active',
//     permissions: 'Auditor',
//   },
//   {
//     position: 4,
//     username: 'Andrew wilson',
//     email: 'Andrew.wilson@gmail.com',
//     status: 'active',
//     permissions: 'Auditor',
//   },

//   {
//     position: 5,
//     username: 'Cody Fisher',
//     email: 'cody.fisher@gmail.com',
//     status: 'active',
//     permissions: 'Manager',
//   },

//   {
//     position: 6,
//     username: 'Jaya Wills',
//     email: 'jaya.wil@gmail.com',
//     status: 'active',
//     permissions: 'Auditor',
//   },

//   {
//     position: 7,
//     username: 'Jerome Bell',
//     email: 'jerome.bell@gmail.com',
//     status: 'active',
//     permissions: 'Manager',
//   },
// ];

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public resultsLength = 0;
  public pageSize = 10;
  public currentPage = 0;
  public pageSizeOptions: number[] = [10, 20, 50, 100, 150, 200];

  displayedColumns: string[] = [
    'username',
    'email',
    'createdAt',
    'isActive',
    'permissions',
    'action',
  ];
  dataSource = new MatTableDataSource<User>([]);
  public usersList!: User[];
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService
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
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '380px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getUserData();
      }
    });
  }

  private getUserData() {
    this.userService.getUsersList().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<User>(data);
      this.resultsLength = data?.length;
      this.usersList = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  public getChipColor(userRole: string) {
    switch (userRole) {
      case 'admin':
        return 'custom-chip admin-chip';

      case 'creator':
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
        this.userService.deleteUser(user).subscribe((response) => {
          this.toastr.success(response?.message);
          this.getUserData();
        });
      }
    });
  }

  public editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: user,
      width: '380px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getUserData();
      }
    });
  }
}
