import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  IconMap2,
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useStore } from '../store';
import MapComponent from "../components/MapComponent";

interface DateRange {
  from: Date;
  to: Date;
}

interface PlaceItem {
  id: string;
  name: string;
  description?: string;
  lat: number;
  lng: number;
  date: DateRange;
}

interface GroupedPlace {
  name: string;
  lat: number;
  lng: number;
  visits: PlaceItem[];
}

export default function PlaceWidget() {
  // 从 Zustand store 获取地点数据和操作方法
  const places = useStore(state => state.places);
  const deletePlace = useStore(state => state.deletePlace);
  
  const [mapCenter, setMapCenter] = useState<[number, number]>([108.55, 34.32]);
  const [mapZoom, setMapZoom] = useState<number>(3); // 默认缩放级别
  const [viewMode, setViewMode] = useState<"china" | "world">("china"); // 视图模式
  const [showPlaces, setShowPlaces] = useState<boolean>(false); // 展开的访问记录 (当前未使用)
  // const [expandedVisits, setExpandedVisits] = useState<Set<string>>(new Set()); // 展开的访问记录
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页码
  const pageSize = 5; // 每页显示的地点数量

  // 按地点名称和日期分组
  const groupedPlaces = useMemo(() => {
    // 首先按地点名称分组
    const byName: Record<string, GroupedPlace> = {};

    places.forEach((place) => {
      // 添加安全检查，确保lat和lng是有效的数字
      if (
        place.lat == null ||
        place.lng == null ||
        isNaN(place.lat) ||
        isNaN(place.lng)
      ) {
        console.warn("无效的地点数据:", place);
        return;
      }

      const key = `${place.name}-${place.lat.toFixed(4)}-${place.lng.toFixed(4)}`;
      if (!byName[key]) {
        byName[key] = {
          name: place.name,
          lat: place.lat,
          lng: place.lng,
          visits: [],
        };
      }
      byName[key].visits.push(place);
    });

    // 对每个地点的访问记录按日期排序
    return Object.values(byName).map((group) => ({
      ...group,
      visits: group.visits.sort(
        (a, b) =>
          new Date(b.date.from).getTime() - new Date(a.date.from).getTime(),
      ), // 倒序排列
    }));
  }, [places]);

  // 分页计算
  const paginatedGroups = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return groupedPlaces.slice(startIndex, endIndex);
  }, [groupedPlaces, currentPage, pageSize]);

  // 总页数
  const totalPages = Math.ceil(groupedPlaces.length / pageSize);

  // 分页导航
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 地图相关逻辑已封装到MapComponent中

  // 切换访问记录展开状态 (当前未使用)
  // const toggleVisits = (placeName: string) => {
  //   const newSet = new Set(expandedVisits);
  //   if (newSet.has(placeName)) {
  //     newSet.delete(placeName);
  //   } else {
  //     newSet.add(placeName);
  //   }
  //   setExpandedVisits(newSet);
  // };

  // 切换视图模式
  const handleViewModeChange = (mode: "china" | "world") => {
    setViewMode(mode);
    if (mode === "china") {
      setMapCenter([103.2319, 35.3349]);
      setMapZoom(4);
    } else {
      setMapCenter([10, 30]); // 世界中心
      setMapZoom(2);
    }
  };

  return (
    <div className="words dark:bg-slate-800 bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">地点</h3>
        {/* 中国/世界视图切换 */}
        <div className="flex items-center space-x-2 text-sm">
          <Switch
            id="view-mode"
            onClick={() =>
              handleViewModeChange(viewMode === "china" ? "world" : "china")
            }
          />
          <Label htmlFor="view-mode">世界</Label>
        </div>
      </div>

      {places.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconMap2 />
            </EmptyMedia>
            <EmptyTitle>标记地点，记录人生</EmptyTitle>
            <EmptyDescription className="w-full">
              你一定走过很多地方，那是你重要的回忆~
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          {/* 地图显示 */}
          <MapComponent 
            center={mapCenter} 
            zoom={mapZoom} 
            places={places} 
            className="h-64 w-full rounded-lg overflow-hidden mb-4"
          />


          {/* 去过的地方数量统计 */}
          <div className="flex justify-between items-center mb-4 px-2">
            <Accordion type="single" collapsible  className="w-full text-center">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  去过{groupedPlaces.length}个地方
                </AccordionTrigger>
                <AccordionContent>
          {/* 地点列表和分页控件 */}

              {/* 地点列表 */}
              <div className="space-y-3">
                {paginatedGroups.map((group) => (
                  <div
                    key={group.name}
                    className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {group.name}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <IconMap2 size={12} />
                        <span>去过 {group.visits.length} 次</span>
                      </div>
                    </div>

                    {/* 显示访问记录 */}
                    <div className="space-y-2">
                      {group.visits
                        .map((place) => (
                          <div
                            key={place.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="text-gray-500 dark:text-gray-400">
                                {new Date(place.date.from).toLocaleDateString()}
                              </div>
                              <div className="text-gray-700 dark:text-gray-300">
                                {place.description || "无描述"}
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {/* 编辑按钮 */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 p-0 text-gray-500 hover:text-blue-500"
                                onClick={() => {
                                  // 触发全局编辑事件
                                  const event = new CustomEvent('edit-place', { detail: place });
                                  window.dispatchEvent(event);
                                }}
                              >
                                <IconEdit size={14} />
                              </Button>
                              {/* 删除按钮 */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                                onClick={() => {
                                  if (confirm('确定要删除这条记录吗？')) {
                                    deletePlace(place.id);
                                  }
                                }}
                              >
                                <IconTrash size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 分页控件 */}
              {groupedPlaces.length > pageSize && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <IconChevronLeft size={16} />
                  </Button>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    第 {currentPage} / {totalPages} 页
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <IconChevronRight size={16} />
                  </Button>
                </div>
              )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div
              className="text-sm text-gray-600 dark:text-gray-400"
              onClick={() => setShowPlaces(!showPlaces)}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}
