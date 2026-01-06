/**
 * 지도 마커 및 상태 Store
 */
import { create } from 'zustand';
import type { MapState } from '@/shared/types';
import { MAP_CONFIG } from '@/shared/config/map';

interface MapStore extends MapState {
  mapInstance: naver.maps.Map | null;
  markers: naver.maps.Marker[];
  setMapInstance: (map: naver.maps.Map | null) => void;
  setCenter: (lat: number, lng: number) => void;
  setZoom: (zoom: number) => void;
  addMarker: (marker: naver.maps.Marker) => void;
  removeMarker: (marker: naver.maps.Marker) => void;
  clearMarkers: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  center: MAP_CONFIG.defaultCenter,
  zoom: MAP_CONFIG.defaultZoom,
  mapInstance: null,
  markers: [],

  setMapInstance: (map) => set({ mapInstance: map }),

  setCenter: (lat, lng) => set({ center: { lat, lng } }),

  setZoom: (zoom) => set({ zoom }),

  addMarker: (marker) =>
    set((state) => ({
      markers: [...state.markers, marker],
    })),

  removeMarker: (marker) =>
    set((state) => ({
      markers: state.markers.filter((m) => m !== marker),
    })),

  clearMarkers: () =>
    set((state) => {
      state.markers.forEach((marker) => marker.setMap(null));
      return { markers: [] };
    }),
}));
