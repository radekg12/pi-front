export class Location {
  latitude: number;
  longitude: number;
  description?: string;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
