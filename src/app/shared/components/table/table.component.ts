import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  people = [
    { name: 'John Doe', age: 25, address: '123 Main St' },
    { name: 'Jane Smith', age: 30, address: '456 Maple Ave' },
    { name: 'Bob Johnson', age: 35, address: '789 Oak Dr' },
  ];
}
