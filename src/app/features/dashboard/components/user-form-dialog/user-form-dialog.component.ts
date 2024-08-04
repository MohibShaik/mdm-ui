import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { CustomersService } from '../../state/customers.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent implements OnInit {
  public myCtrl = new FormControl([]);
  public fillingList = [];
  filteredPeopleList!: Observable<any[]>;
  separatorKeysCodes: number[] = [COMMA, ENTER];
  inputControl = new FormControl();
  selectedOptions: string[] = [];
  allOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  filteredOptions!: Observable<string[]>;
  public addOnBlur: boolean = false;
  @ViewChild('peopleInput') peopleInput!: ElementRef;

  constructor(private service: CustomersService) {
    this.myCtrl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: any) => {
        if (value.length >= 3) {
          this.searchSkills(value);
        }
      });
  }

  searchSkills(value: string) {
    this.filteredPeopleList = this.service.searchSkills(value);
  }

  ngOnInit() {
    this.filteredOptions = this.inputControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedOptions.push(value);
    }

    event.input.value = '';
    this.inputControl.setValue(null);
  }

  remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);

    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.push(event.option.viewValue);
    this.peopleInput.nativeElement.value = '';
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
