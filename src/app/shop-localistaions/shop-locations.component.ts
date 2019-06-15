import {Component, OnInit} from '@angular/core';
import {Location} from '../models/location.model';
import {ShopLocationsService} from '../services/shop-locations.service';

@Component({
  selector: 'app-shop-locations',
  templateUrl: './shop-locations.component.html',
  styleUrls: ['./shop-locations.component.css']
})
export class ShopLocationsComponent implements OnInit {
  customerLocation: Location;
  markers: Location[];
  zoom = 12;

  constructor(private locationsService: ShopLocationsService) {
  }

  ngOnInit(): void {
    this.findMe();
    this.locationsService.getLocations().subscribe(data => this.markers = data);
  }

  private findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  private showPosition(position: Position) {
    this.customerLocation.lng = position.coords.longitude;
    this.customerLocation.lat = position.coords.latitude;
  }
}


