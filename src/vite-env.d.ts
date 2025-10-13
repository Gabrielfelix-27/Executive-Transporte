/// <reference types="vite/client" />

// Google Maps API Type Declarations
declare global {
  interface Window {
    google: typeof google;
  }
  
  namespace google {
    namespace maps {
      // Routes API (nova e recomendada)
      namespace routes {
        class DirectionsService {
          route(
            request: google.maps.DirectionsRequest,
            callback: (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => void
          ): void;
        }
      }
      
      // Distance Matrix API (depreciada, mantida para compatibilidade)
      class DistanceMatrixService {
        getDistanceMatrix(
          request: google.maps.DistanceMatrixRequest,
          callback: (response: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => void
        ): void;
      }

      class Geocoder {
        geocode(
          request: google.maps.GeocoderRequest,
          callback: (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => void
        ): void;
      }
      
      interface GeocoderResult {
        geometry: {
          location: {
            lat(): number;
            lng(): number;
          };
        };
      }
      
      type GeocoderStatus = string;
      
      // Routes API interfaces
      interface DirectionsRequest {
        origin: string;
        destination: string;
        travelMode: google.maps.TravelMode;
        unitSystem: google.maps.UnitSystem;
        avoidHighways?: boolean;
        avoidTolls?: boolean;
        region?: string;
      }
      
      interface DirectionsResult {
        routes: google.maps.DirectionsRoute[];
      }
      
      interface DirectionsRoute {
        legs: google.maps.DirectionsLeg[];
      }
      
      interface DirectionsLeg {
        distance?: {
          text: string;
          value: number;
        };
        duration?: {
          text: string;
          value: number;
        };
      }
      
      type DirectionsStatus = string;
      
      // Distance Matrix API interfaces (mantidas para compatibilidade)
      interface DistanceMatrixRequest {
        origins: string[];
        destinations: string[];
        travelMode: google.maps.TravelMode;
        unitSystem: google.maps.UnitSystem;
        avoidHighways?: boolean;
        avoidTolls?: boolean;
        region?: string;
      }
      
      interface DistanceMatrixResponse {
        rows: google.maps.DistanceMatrixResponseRow[];
      }
      
      interface DistanceMatrixResponseRow {
        elements: google.maps.DistanceMatrixResponseElement[];
      }
      
      interface DistanceMatrixResponseElement {
        status: string;
        distance?: {
          text: string;
          value: number;
        };
        duration?: {
          text: string;
          value: number;
        };
      }
      
      enum TravelMode {
        DRIVING = 'DRIVING',
        WALKING = 'WALKING',
        BICYCLING = 'BICYCLING',
        TRANSIT = 'TRANSIT'
      }
      
      enum UnitSystem {
        METRIC = 0,
        IMPERIAL = 1
      }
      
      type DistanceMatrixStatus = string;
    }
  }
}

export {};
