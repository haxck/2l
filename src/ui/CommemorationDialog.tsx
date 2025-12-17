import { useState } from 'react';
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
import { ChevronDownIcon } from 'lucide-react';

interface CommemorationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCommemoration: (title: string, date: Date) => void;
}

export const CommemorationDialog = ({
  open,
  onOpenChange,
  onAddCommemoration
}: CommemorationDialogProps) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!title || !date) {
      alert('请填写完整');
      e.preventDefault(); // 阻止 DialogClose 默认行为，防止关闭模态框
      return;
    }
    onAddCommemoration(title, date);
    onOpenChange(false); // 成功后手动关闭模态框
    // 重置表单
    setTitle('');
    setDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className=" justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "什么时候？"}
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
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setCalendarOpen(false);
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleAdd}>
                添加
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
