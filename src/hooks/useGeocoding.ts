import { useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

// 声明类型
declare global {
  interface Window {
    _AMapSecurityConfig?: { securityJsCode: string };
  }
}

interface GeocodingResult {
  latLng: { lat: number; lng: number } | null;
  isGeocoding: boolean;
  error: string | null;
}

interface GeocodingResult {
  latLng: { lat: number; lng: number } | null;
  isGeocoding: boolean;
  error: string | null;
  fetchCoordinates: (placeName: string) => Promise<{ lat: number; lng: number } | null>;
  reset: () => void;
}

export const useGeocoding = (): GeocodingResult => {
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
  const AMAP_SECURITY_KEY = import.meta.env.VITE_AMAP_SECURITY_KEY;

  const fetchCoordinates = async (placeName: string): Promise<{ lat: number; lng: number } | null> => {
    if (!placeName.trim()) {
      setError("请输入地点名称");
      return null;
    }

    // 只有当输入长度大于1时才获取新的经纬度
    if (placeName.length < 2) {
      setError("地点名称太短，请输入更详细的地址");
      return null;
    }

    setIsGeocoding(true);
    setError(null);

    try {
      window._AMapSecurityConfig = {
        securityJsCode: AMAP_SECURITY_KEY,
      };
      
      // 加载高德地图API和Geocoder插件
      await AMapLoader.load({
        key: AMAP_KEY,
        version: "2.0",
        plugins: ["AMap.Geocoder"],
      });

      // 使用地理编码服务
      if (window.AMap && window.AMap.Geocoder) {
        return new Promise((resolve) => {
          const geocoder = new window.AMap.Geocoder();
          geocoder.getLocation(placeName, (status: string, result: any) => {
            if (status === "complete" && result.geocodes.length > 0) {
              const { lat, lng } = result.geocodes[0].location;
              setLatLng({ lat, lng });
              resolve({ lat, lng });
            } else {
              setError("无法找到该地点的位置信息");
              setLatLng(null);
              resolve(null);
            }
            setIsGeocoding(false);
          });
        });
      } else {
        throw new Error("高德地图Geocoder插件加载失败");
      }
    } catch (error) {
      console.error("地理编码错误:", error);
      setError("获取位置信息失败，请检查网络或API Key");
      setIsGeocoding(false);
      return null;
    }
  };

  const reset = () => {
    setLatLng(null);
    setError(null);
    setIsGeocoding(false);
  };

  return { latLng, isGeocoding, error, fetchCoordinates, reset };
};
