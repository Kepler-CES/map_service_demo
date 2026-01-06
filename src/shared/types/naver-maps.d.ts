/**
 * 네이버 지도 API 타입 선언
 * https://navermaps.github.io/maps.js.ncp/docs/
 */

declare global {
  namespace naver {
    namespace maps {
      class Map {
        constructor(mapDiv: string | HTMLElement, mapOptions?: MapOptions);
        setCenter(center: LatLng | LatLngLiteral): void;
        getCenter(): LatLng;
        setZoom(level: number, useEffect?: boolean): void;
        getZoom(): number;
        setBounds(bounds: LatLngBounds): void;
        fitBounds(bounds: LatLngBounds): void;
        panTo(coord: LatLng | LatLngLiteral): void;
        destroy(): void;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        zoomControl?: boolean;
        zoomControlOptions?: ZoomControlOptions;
        mapTypeControl?: boolean;
        mapDataControl?: boolean;
        scaleControl?: boolean;
        logoControl?: boolean;
        mapTypeId?: string;
      }

      interface ZoomControlOptions {
        position?: Position;
      }

      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
        equals(latlng: LatLng): boolean;
        toString(): string;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      class LatLngBounds {
        constructor(sw: LatLng | LatLngLiteral, ne: LatLng | LatLngLiteral);
        extend(coord: LatLng | LatLngLiteral): LatLngBounds;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        getMap(): Map | null;
        setPosition(position: LatLng | LatLngLiteral): void;
        getPosition(): LatLng;
        setTitle(title: string): void;
        getTitle(): string;
        setIcon(icon: string | ImageIcon): void;
        setVisible(visible: boolean): void;
        getVisible(): boolean;
      }

      interface MarkerOptions {
        position: LatLng | LatLngLiteral;
        map?: Map;
        icon?: string | ImageIcon;
        title?: string;
        cursor?: string;
        clickable?: boolean;
        draggable?: boolean;
        visible?: boolean;
        zIndex?: number;
      }

      interface ImageIcon {
        url: string;
        size?: Size;
        scaledSize?: Size;
        origin?: Point;
        anchor?: Point;
      }

      class Size {
        constructor(width: number, height: number);
        width: number;
        height: number;
      }

      class Point {
        constructor(x: number, y: number);
        x: number;
        y: number;
      }

      enum Position {
        TOP_LEFT,
        TOP_CENTER,
        TOP_RIGHT,
        LEFT_CENTER,
        CENTER,
        RIGHT_CENTER,
        BOTTOM_LEFT,
        BOTTOM_CENTER,
        BOTTOM_RIGHT,
      }

      namespace Event {
        function addListener(
          target: Map | Marker | unknown,
          eventName: string,
          listener: (...args: unknown[]) => void
        ): MapEventListener;
        function removeListener(listener: MapEventListener): void;
      }

      interface MapEventListener {
        target: Map | Marker | unknown;
        eventName: string;
      }

      namespace Service {
        class Geocoder {
          addressToCoord(
            address: string,
            callback: (status: GeocodeStatus, response: GeocodeResponse) => void
          ): void;
          coordToAddress(
            coord: LatLng | LatLngLiteral,
            callback: (status: GeocodeStatus, response: GeocodeResponse) => void
          ): void;
        }

        enum GeocodeStatus {
          OK = 'OK',
          ERROR = 'ERROR',
        }

        interface GeocodeResponse {
          v2?: {
            status: string;
            addresses?: GeocodeAddress[];
            errorMessage?: string;
          };
        }

        interface GeocodeAddress {
          roadAddress: string;
          jibunAddress: string;
          englishAddress: string;
          x: string;
          y: string;
          distance: number;
        }
      }
    }
  }

  interface Window {
    naver: typeof naver;
  }
}

export {};
