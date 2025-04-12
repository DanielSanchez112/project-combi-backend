export interface Location {
    lat: number;
    lng: number;
    idVehiculo: number;
    timestamp: string;
  }
  
  export interface LocationResponse {
    message: string;
    data?: Location;
    error?: string;
  }
  