import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../state/customers.service';
import { authQuery } from 'src/app/features/auth/state/auth.query';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss'],
})
export class EmpDetailsComponent implements OnInit {
  empDetails: any;
  panelOpenState = true;
  constructor(
    private route: ActivatedRoute,
    private service: CustomersService,
    public query: authQuery
  ) {
    const id = this.route.snapshot.paramMap.get('empId')!;
    this.getEmpDetailsById(id);
  }

  ngOnInit(): void {}

  private getEmpDetailsById(empId: string) {
    this.service.getEmpDetailsById(empId).subscribe((response) => {
      this.empDetails = response?.data;
    });
  }
}
