import { useEffect, useRef, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

// 高德地图API密钥 - 内部封装，不对外暴露
const AMAP_KEY = import.meta.env.VITE_AMAP_KEY;
const AMAP_SECURITY_KEY = import.meta.env.VITE_AMAP_SECURITY_KEY;

// 声明全局AMap变量
declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig?: { securityJsCode: string };
  }
}

interface MapComponentProps {
  center?: [number, number]; // 地图中心点坐标
  zoom?: number; // 地图缩放级别
  places?: Array<{
    id: string;
    name: string;
    description?: string;
    lat: number;
    lng: number;
    date?: any;
  }>; // 地点数据
  className?: string; // 自定义样式类名
}

export default function MapComponent({ 
  center = [108.55, 34.32], 
  zoom = 3, 
  places = [], 
  className = "h-64 w-full rounded-lg overflow-hidden" 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // 初始化高德地图
  const initMap = async () => {
    if (!mapRef.current) {
      console.error("地图容器不存在");
      return;
    }

    if (mapInstance.current) {
      console.log("地图实例已存在，无需重复初始化");
      return;
    }

    try {
      // 配置安全密钥
      if (AMAP_SECURITY_KEY) {
        window._AMapSecurityConfig = { securityJsCode: AMAP_SECURITY_KEY };
        console.log("安全密钥配置完成");
      }

      // 确保地图容器有明确的尺寸
      if (mapRef.current.clientWidth === 0 || mapRef.current.clientHeight === 0) {
        console.warn("地图容器尺寸为0，设置默认尺寸");
        mapRef.current.style.width = "100%";
        mapRef.current.style.height = "300px";
      }

      console.log("开始加载高德地图API");
      // 加载高德地图API
      await AMapLoader.load({
        key: AMAP_KEY,
        version: "2.0",
        plugins: ["AMap.Scale", "AMap.Marker", "AMap.InfoWindow"],
      });

      console.log("高德地图API加载成功，创建地图实例");
      // 创建地图实例
      const map = new window.AMap.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        viewMode: "3D",
        resizeEnable: true,
        mapStyle: "amap://styles/fresh",
      });

      mapInstance.current = map;
      setMapLoaded(true);
      console.log("地图实例创建成功");

      // 添加标记
      addMarkers(map);
    } catch (error) {
      console.error("高德地图初始化失败:", error);
    }
  };

  // 添加标记
  const addMarkers = (map: any) => {
    if (!map) return;

    // 清除地图上所有标记
    map.clearMap();

    if (places.length === 0) {
      console.log("没有地点数据，不添加标记");
      return;
    }

    places.forEach((place) => {
      try {
        // 创建自定义标记
        const marker = new window.AMap.Marker({
          position: [place.lng, place.lat],
          map: map,
          icon: new window.AMap.Icon({
            image: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            size: [24, 36],
            imageSize: [24, 36],
            anchor: "center"
          }),
          offset: new window.AMap.Pixel(-12,-36)
        });

        // 创建信息窗口
        const infoWindow = new window.AMap.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h4 style="margin: 0 0 5px 0; font-weight: bold;">${place.name}</h4>
              ${place.description ? `<p style="margin: 5px 0; font-size: 12px; color: #666;">${place.description}</p>` : ""}
              ${place.date ? `<p style="margin: 5px 0; font-size: 11px; color: #999;">访问日期: ${new Date(place.date.from || place.date).toLocaleDateString("zh-CN")}</p>` : ""}
            </div>
          `,
          offset: new window.AMap.Pixel(0, -36),
        });

        // 点击标记显示信息窗口
        marker.on("click", () => {
          infoWindow.open(map, marker.getPosition());
        });
      } catch (error) {
        console.error("创建标记失败:", error);
      }
    });
  };

  // 地图API（如果需要可以暴露）
  // 设置地图中心点
  // const setCenter = (lng: number, lat: number) => {
  //   if (mapInstance.current && mapLoaded) {
  //     mapInstance.current.setCenter([lng, lat]);
  //   }
  // };

  // 设置地图缩放级别
  // const setZoom = (zoomLevel: number) => {
  //   if (mapInstance.current && mapLoaded) {
  //     mapInstance.current.setZoom(zoomLevel);
  //   }
  // };

  // 地图初始化
  useEffect(() => {
    // 直接初始化地图，不延迟
    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  // 当地点数据变化时更新标记
  useEffect(() => {
    if (mapInstance.current && mapLoaded) {
      addMarkers(mapInstance.current);
    }
  }, [places]);

  // 当地图中心点或缩放级别变化时更新地图
  useEffect(() => {
    if (mapInstance.current && mapLoaded) {
      mapInstance.current.setCenter(center);
      mapInstance.current.setZoom(zoom);
    }
  }, [center, zoom]);

  // 当组件重新渲染时，确保地图正确显示
  useEffect(() => {
    if (mapInstance.current && mapLoaded) {
      console.log("地图重绘");
      mapInstance.current.resize();
    }
  }, [mapLoaded]);

  return (
    <div ref={mapRef} className={className} style={{ minHeight: "300px" }}></div>
  );
}
