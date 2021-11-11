import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() allAmenities: any = [];
  @Output() hotelSearchEvent = new EventEmitter();
  @Output() citySearchEvent = new EventEmitter();

  hotelSearch = '';
  citySearch = '';
  listDisplay = 'none';
  checkboxFlag: any = '';

  toggleAmenityList() {
    this.listDisplay = this.listDisplay === 'none' ? 'flex' : 'none'
  }

  emitHotelSearch(value: string) {
    this.hotelSearch = value;
    this.hotelSearchEvent.emit(this.hotelSearch);
  }

  emitCitySearch(event: any) {
    console.log(this.checkboxFlag);
    if (event.key === 'Enter') {
      this.citySearchEvent.emit(this.citySearch);
    }
  }
}