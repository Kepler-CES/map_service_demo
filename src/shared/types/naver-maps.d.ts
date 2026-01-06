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
          listener: (...args: unknown[]) => void,
        ): MapEventListener;
        function removeListener(listener: MapEventListener): void;
      }

      interface MapEventListener {
        target: Map | Marker | unknown;
        eventName: string;
      }

      namespace Service {
        function geocode(
          options: ServiceOptions,
          callback: (status: Status, response?: GeocodeResponse) => void,
        ): void;

        interface ServiceOptions {
          query?: string;
          coordinate?: string;
          filter?: string;
          page?: number;
          count?: number;
        }

        enum Status {
          OK = 200,
          ERROR = 500,
        }

        interface GeocodeResponse {
          result?: {
            userquery: string;
            total: number;
            items: AddressItem[];
          };
          v2?: {
            status: string;
            addresses?: AddressItemV2[];
            errorMessage?: string;
          };
        }

        interface AddressItem {
          address: string;
          addrdetail: {
            country: string;
            sido: string;
            sigugun: string;
            dongmyun: string;
            rest: string;
          };
          isRoadAddress: boolean;
          point: {
            x: number;
            y: number;
          };
        }

        interface AddressItemV2 {
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
