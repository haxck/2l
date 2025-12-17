import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DiaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveDiary: (content: string) => void;
}

export const DiaryDialog = ({
  open,
  onOpenChange,
  onSaveDiary
}: DiaryDialogProps) => {
  const [diaryContent, setDiaryContent] = useState<string>('');

  const handleSave = () => {
    if (!diaryContent.trim()) {
      alert('请填写日记内容');
      return;
    }

    onSaveDiary(diaryContent.trim());
    onOpenChange(false); // 成功后手动关闭模态框
    setDiaryContent(''); // 重置表单
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-content max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            写日记
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
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
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                取消
              </Button>
            </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSave}>
              保存日记
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
