import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { useGeocoding } from '../hooks/useGeocoding';
import { usePlaceSuggestions } from '../hooks/usePlaceSuggestions';

interface Place {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  date: {
    from: Date;
    to: Date;
  };
}

interface PlaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlace: (name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => void;
  onEditPlace?: (id: string, name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => void;
  places: Place[];
  editingPlace?: Place;
}

export const PlaceDialog = ({
  open,
  onOpenChange,
  onAddPlace,
  onEditPlace,
  places,
  editingPlace
}: PlaceDialogProps) => {
  const [placeName, setPlaceName] = useState<string>('');
  const [placeDescription, setPlaceDescription] = useState<string>('');
  const [placeLatLng, setPlaceLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [placeDate, setPlaceDate] = useState<{ from: Date; to: Date }>({ from: new Date(), to: new Date() });
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const isEditMode = !!editingPlace;

  // 使用地理编码hook
  const { latLng: geocodedLatLng, isGeocoding, error: geocodeError, fetchCoordinates, reset: resetGeocoding } = useGeocoding();

  // 更新经纬度当地理编码结果变化
  useEffect(() => {
    if (geocodedLatLng) {
      setPlaceLatLng(geocodedLatLng);
    }
  }, [geocodedLatLng]);

  // 初始化编辑数据
  useEffect(() => {
    if (editingPlace && open) {
      setPlaceName(editingPlace.name);
      setPlaceDescription(editingPlace.description);
      setPlaceLatLng({ lat: editingPlace.lat, lng: editingPlace.lng });
      setPlaceDate({ 
        from: new Date(editingPlace.date.from), 
        to: new Date(editingPlace.date.to) 
      });
    }
  }, [editingPlace, open]);

  // 当对话框关闭时重置地理编码状态
  useEffect(() => {
    if (!open) {
      resetGeocoding();
    }
  }, [open, resetGeocoding]);

  // 使用地点建议hook
  const { filteredPlaces, showSuggestions, setShowSuggestions, selectPlace } = usePlaceSuggestions(
    places,
    placeName,
    (place) => {
      setPlaceName(place.name);
      setPlaceDescription(place.description);
      setPlaceLatLng({ lat: place.lat, lng: place.lng });
      setPlaceDate(place.date);
    }
  );

  const handleSave = async () => {
    if (!placeName.trim()) {
      alert('请填写地点名称');
      return;
    }

    // 如果是编辑模式且地点名称未改变，可以使用原有坐标
    if (isEditMode && editingPlace && placeName.trim() === editingPlace.name) {
      if (onEditPlace && editingPlace) {
        onEditPlace(
          editingPlace.id,
          placeName.trim(),
          placeDescription.trim(),
          editingPlace.lat,
          editingPlace.lng,
          placeDate
        );
      }
      showSuccessMessage();
      return;
    }

    // 触发地理编码
    const coordinates = await fetchCoordinates(placeName.trim());
    
    if (!coordinates) {
      // 地理编码失败，继续填写
      return;
    }

    // 地理编码成功，保存地点
    if (isEditMode && onEditPlace && editingPlace) {
      onEditPlace(
        editingPlace.id,
        placeName.trim(),
        placeDescription.trim(),
        coordinates.lat,
        coordinates.lng,
        placeDate
      );
    } else {
      onAddPlace(
        placeName.trim(),
        placeDescription.trim(),
        coordinates.lat,
        coordinates.lng,
        placeDate
      );
    }

    showSuccessMessage();
  };

  const showSuccessMessage = () => {
    // 显示成功提示
    alert(isEditMode ? '地点修改成功' : '地点添加成功');
    
    // 关闭模态框
    onOpenChange(false);
    
    // 重置表单
    setPlaceName('');
    setPlaceDescription('');
    setPlaceLatLng(null);
    setPlaceDate({ from: new Date(), to: new Date() });
    resetGeocoding();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            {isEditMode ? '编辑地点' : '添加去过的地方'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            {/* 地点名称（可编辑） */}
            <div className="flex flex-col gap-3 relative">
              <Label htmlFor="place-name" className="px-1">
                地点名称：
              </Label>
              <Input
                type="text"
                placeholder="例如：北京故宫"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                required
                className="w-full"
                onBlur={() => {
                  // 延迟关闭提示，以便用户点击选项
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onFocus={() => {
                  if (filteredPlaces.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
              />
              
              {/* 去过的地方提示 */}
              {showSuggestions && (
                <div className="absolute z-10 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                      onClick={() => selectPlace(place)}
                    >
                      <div className="font-medium">{place.name}</div>
                      {place.description && (
                        <div className="text-xs text-gray-500">{place.description}</div>
                      )}
                      <div className="text-xs text-gray-400">
                        {new Date(place.date.from).toLocaleDateString()} - {new Date(place.date.to).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 地理编码状态显示 */}
              {isGeocoding && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>正在获取位置信息...</span>
                </div>
              )}

              {geocodeError && (
                <div className="text-sm text-red-600">{geocodeError}</div>
              )}

              {placeLatLng && !isGeocoding && !geocodeError && (
                <div className="text-sm text-green-600">
                  已成功获取位置信息
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="place-description" className="px-1">
                描述（可选）：
              </Label>
              <textarea
                id="place-description"
                placeholder="记录一下在这个地方的经历..."
                value={placeDescription}
                onChange={(e) => setPlaceDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg resize-none h-20"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="place-date" className="px-1">
                日期：
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="place-date"
                    className="justify-between font-normal"
                  >
                    {placeDate.from
                      ? placeDate.from.toLocaleDateString()
                      : "选择开始日期"}
                    -
                    {placeDate.to
                      ? placeDate.to.toLocaleDateString()
                      : "选择结束日期"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 overflow-hidden p-0"
                  align="center"
                >
                  <Calendar
                    startMonth={new Date(1950, 0, 1)}
                    endMonth={new Date(2030, 11, 31)}
                    mode="range"
                    selected={placeDate}
                    captionLayout="dropdown"
                    className="w-auto h-86"
                    onSelect={(date) => {
                      if (date) {
                        setPlaceDate({
                          from: date.from || new Date(),
                          to: date.to || new Date(),
                        });
                        setCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-end gap-3">
          <DialogClose asChild>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>
            </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>
              {isEditMode ? '保存修改' : '添加地点'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
