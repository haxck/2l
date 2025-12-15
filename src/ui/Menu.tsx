import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Menu({
  SetCommemorations,
}: {
  SetCommemorations: (title: string, time: string) => void;
}) {
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const onAction = () => {
    if (title === "" || title === null || time === null || time === "") {
      alert("请填写完整");
    } else {
      SetCommemorations(title, time);
      setDialogOpen(false);
    }
  };

  const handleAddClick = () => {
    setTitle("");
    setTime("");
    setDialogOpen(true);
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
        <DropdownMenuContent align="end" >
          <DropdownMenuItem onSelect={handleAddClick}>
            <DropdownMenuLabel>添加新的纪念日</DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>添加新的纪念日</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="什么纪念日呢？"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="time">哪一天？</label>
                <Input
                  type="date"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={onAction}>添加</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
