/// <reference types="vite/client" />

// Google Maps API Type Declarations
declare global {
  interface Window {
    google: typeof google;
  }
  
  namespace google {
    namespace maps {
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
      
      interface GeocoderRequest {
        address?: string;
        region?: string;
        componentRestrictions?: {
          country?: string;
        };
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
