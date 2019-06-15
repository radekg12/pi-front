export class Location {
  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  lat: number;
  lng: number;
  info?: string;
}
