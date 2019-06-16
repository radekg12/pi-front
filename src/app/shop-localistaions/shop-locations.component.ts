import {Component, OnInit} from '@angular/core';
import {Location} from '../models/location.model';
import {ShopLocationsService} from '../services/shop-locations.service';

const DEFAULT_LOCATION = new Location(52.231663, 21.006088);

@Component({
  selector: 'app-shop-locations',
  templateUrl: './shop-locations.component.html',
  styleUrls: ['./shop-locations.component.css']
})
export class ShopLocationsComponent implements OnInit {
  customerLocation: Location = DEFAULT_LOCATION;
  markers: Location[];
  zoom = 12;

  constructor(private locationsService: ShopLocationsService) {
  }

  ngOnInit(): void {
    this.findMe();
  }

  private findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        this.getClosestShops();
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  private showPosition(position: Position) {
    this.customerLocation.longitude = position.coords.longitude;
    this.customerLocation.latitude = position.coords.latitude;
  }

  private getClosestShops() {
    this.locationsService.getLocations(this.customerLocation).subscribe(data => {
      this.markers = data;
      this.customerLocation = this.markers[0];
    });
  }
}


