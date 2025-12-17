import { useState, useEffect } from "react";

// Button组件已被移除，不再需要导入
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "../store";
import { CommemorationDialog } from "./CommemorationDialog";
import { DiaryDialog } from "./DiaryDialog";
import { PlaceDialog } from "./PlaceDialog";
export default function Menu({
  SetCommemorations,
}: {
  SetCommemorations: (title: string, date: Date) => void;
}) {
  // 对话框状态
  const [commemorationDialogOpen, setCommemorationDialogOpen] = useState<boolean>(false);
  const [diaryDialogOpen, setDiaryDialogOpen] = useState<boolean>(false);
  const [placeDialogOpen, setPlaceDialogOpen] = useState<boolean>(false);
  const [editingPlace, setEditingPlace] = useState<any>(null);

  // 从 store 获取 actions 和状态
  const addDiary = useStore((state) => state.addDiary);
  const addPlace = useStore((state) => state.addPlace);
  const editPlace = useStore((state) => state.editPlace);
  const places = useStore((state) => state.places);

  // 处理添加纪念日
  const handleAddCommemoration = (title: string, date: Date) => {
    SetCommemorations(title, date);
  };

  // 处理保存日记
  const handleSaveDiary = (content: string) => {
    addDiary(content);
  };

  // 处理添加地点
  const handleAddPlace = (name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => {
    addPlace(name, description, lat, lng, date);
    setEditingPlace(null);
  };
  
  // 处理编辑地点
  const handleEditPlace = (id: string, name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => {
    editPlace(id, name, description, lat, lng, date);
    setEditingPlace(null);
  };
  
  // 打开编辑地点对话框
  const openEditPlaceDialog = (place: any) => {
    setEditingPlace(place);
    setPlaceDialogOpen(true);
  };

  // 监听编辑事件
  useEffect(() => {
    const handleEditEvent = (event: CustomEvent) => {
      const place = event.detail;
      openEditPlaceDialog(place);
    };
    
    // 添加事件监听
    window.addEventListener('edit-place', handleEditEvent as EventListener);
    
    // 清理事件监听
    return () => {
      window.removeEventListener('edit-place', handleEditEvent as EventListener);
    };
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="z-100 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg fixed bottom-8 right-8 text-2xl pb-1 font-bold w-14 h-14 rounded-full flex items-center justify-center"
            aria-label="添加"
          >
            +
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setCommemorationDialogOpen(true)}>
            <DropdownMenuLabel>纪念日 · 倒数日</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDiaryDialogOpen(true)}>
            <DropdownMenuLabel>日记</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setPlaceDialogOpen(true)}>
            <DropdownMenuLabel>去过的地方</DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 纪念日对话框 */}
      <CommemorationDialog
        open={commemorationDialogOpen}
        onOpenChange={setCommemorationDialogOpen}
        onAddCommemoration={handleAddCommemoration}
      />

      {/* 日记对话框 */}
      <DiaryDialog
        open={diaryDialogOpen}
        onOpenChange={setDiaryDialogOpen}
        onSaveDiary={handleSaveDiary}
      />

      {/* 地点对话框 */}
      <PlaceDialog
        open={placeDialogOpen}
        onOpenChange={(open) => {
          setPlaceDialogOpen(open);
          if (!open) {
            setEditingPlace(null);
          }
        }}
        onAddPlace={handleAddPlace}
        onEditPlace={handleEditPlace}
        places={places}
        editingPlace={editingPlace}
      />
    </div>
  );
}
