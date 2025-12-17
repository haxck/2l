declare namespace AMap {
  interface Location {
    lat: number;
    lng: number;
  }

  interface GeocodeResult {
    geocodes: Array<{
      location: Location;
      formattedAddress: string;
      country: string;
      province: string;
      city: string;
      district: string;
      township: string;
      neighborhood: {
        name: string;
        type: string;
      };
      building: {
        name: string;
        type: string;
      };
      adcode: string;
      street: string;
      number: string;
      level: string;
    }>;
    info: string;
    status: string;
  }

  interface Geocoder {
    getLocation(address: string, callback: (status: string, result: GeocodeResult) => void): void;
  }

  function Geocoder(options?: any): Geocoder;
}

declare module '@amap/amap-jsapi-loader' {
  interface AMapLoaderOptions {
    key: string;
    version?: string;
    plugins?: string[];
    AMapUI?: any;
    Loca?: any;
    [key: string]: any;
  }

  interface AMapLoader {
    load: (options: AMapLoaderOptions) => Promise<void>;
  }

  const loader: AMapLoader;
  export default loader;
}