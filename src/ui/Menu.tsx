import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
export default function Menu({
  SetCommemorations,
}: {
  SetCommemorations: (title: string, date: Date) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  // 日记功能状态
  const [diaryDialogOpen, setDiaryDialogOpen] = useState<boolean>(false);
  const [diaryContent, setDiaryContent] = useState<string>("");

  const onAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!title || !date) {
      alert("请填写完整");
      e.preventDefault(); // 阻止 DialogClose 默认行为，防止关闭模态框
      return;
    }
    SetCommemorations(title, date);
    setOpen(false); // 成功后手动关闭模态框
  };

  const handleAddClick = () => {
    setTitle("");
    setDate(undefined);
    setDialogOpen(true);
  };

  // 处理添加日记点击
  const handleAddDiaryClick = () => {
    setDiaryContent("");
    setDiaryDialogOpen(true);
  };

  // 保存日记
  const saveDiary = () => {
    if (!diaryContent.trim()) {
      alert("请填写日记内容");
      return;
    }
    
    // 获取现有日记
    const stored = localStorage.getItem('diaries');
    const diaries = stored ? JSON.parse(stored) : [];
    
    // 创建新日记
    const newDiary = {
      id: Date.now().toString(),
      date: new Date(),
      content: diaryContent.trim()
    };
    
    // 更新并保存日记
    const updatedDiaries = [newDiary, ...diaries];
    localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
    
    // 触发自定义事件，通知其他组件数据已更新
    window.dispatchEvent(new CustomEvent('diaryUpdated'));
    
    // 关闭对话框
    setDiaryDialogOpen(false);
  };

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
          <DropdownMenuItem onSelect={handleAddClick}>
            <DropdownMenuLabel>添加新的纪念日</DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleAddDiaryClick}>
            <DropdownMenuLabel>写日记</DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <form>
          <DialogContent className="dialog-content">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                添加新的纪念日 · 倒数日
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="px-1">
                    事件：
                  </Label>
                  <Input
                    type="text"
                    placeholder="这事一定对你很重要"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      日期：
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className=" justify-between font-normal"
                        >
                          {date ? date.toLocaleDateString() : "很特别的一天"}
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
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          className="w-auto h-86 "
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  取消
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={onAction}>添加</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {/* 日记对话框 */}
      <Dialog open={diaryDialogOpen} onOpenChange={setDiaryDialogOpen}>
        <DialogContent className="dialog-content max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
              写日记
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="diary-content" className="px-1">
                  今日心情：
                </Label>
                <textarea
                  id="diary-content"
                  placeholder="写下今天的心情和故事..."
                  value={diaryContent}
                  onChange={(e) => setDiaryContent(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none h-40"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setDiaryDialogOpen(false)}>
                取消
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={saveDiary}>
                保存日记
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
