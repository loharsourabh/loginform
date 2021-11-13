import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {
  @Input() allAmenities: any = [];
  @Output() hotelSearchEvent = new EventEmitter();
  @Output() citySearchEvent = new EventEmitter();
  @Output() amenitiesCheckedEvent = new EventEmitter();

  hotelSearch = '';
  citySearch = '';
  amenitiesChecked: any = [];
  listDisplay = 'none';

  toggleAmenityList() {
    this.listDisplay = this.listDisplay === 'none' ? 'flex' : 'none'
  }

  updateAmenitiesChecked(checked: any, i: number) {
    this.amenitiesChecked[i].checked = checked;
    this.amenitiesCheckedEvent.emit(this.amenitiesChecked);
  }

  emitHotelSearch(value: string) {
    this.hotelSearch = value;
    this.hotelSearchEvent.emit(this.hotelSearch);
  }

  emitCitySearch(event: any) {
    if (event.key === 'Enter') {
      this.citySearchEvent.emit(this.citySearch);
    }
  }

  ngOnChanges() {
    if (this.allAmenities.length) {
      this.amenitiesChecked = this.allAmenities.map((amenity: any) => ({
        name: amenity.name,
        checked: false,
      }));
    }
  }
}