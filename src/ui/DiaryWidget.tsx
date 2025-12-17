import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useStore } from '../store';

interface DiaryItem {
  id: string;
  date: Date;
  content: string;
}

export default function DiaryWidget() {
  // 从 Zustand store 获取日记数据和相关 actions
  const diaries = useStore(state => state.diaries);
  const deleteDiary = useStore(state => state.deleteDiary);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // 开始编辑日记
  const startEdit = (diary: DiaryItem) => {
    setEditingId(diary.id);
    setEditingContent(diary.content);
  };

  // 保存编辑
  const saveEdit = () => {
    if (!editingId || !editingContent.trim()) return;
    
    // 由于当前 Zustand store 没有提供更新日记的 action，我们需要先获取所有日记，更新后再全部替换
    // 注意：这是一个临时解决方案，后续可以在 store 中添加 updateDiary action
    const allDiaries = useStore.getState().diaries;
    const updatedDiaries = allDiaries.map(diary => 
      diary.id === editingId 
        ? { ...diary, content: editingContent.trim(), date: new Date() } 
        : diary
    );
    
    // 直接更新 store 状态
    useStore.setState({ diaries: updatedDiaries });
    
    setEditingId(null);
    setEditingContent('');
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent('');
  };
  
  // 对日记进行排序（最新的在前面）
  const sortedDiaries = [...diaries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="words dark:bg-slate-800 bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">日记</h3>
      </div>

      {/* 日记列表 */}
      <div className="space-y-3 mb-4">
        {sortedDiaries.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            还没有日记，点击右下角开始写日记吧~</p>
        ) : (
          sortedDiaries.map(diary => (
            <div 
              key={diary.id} 
              className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className=" text-gray-500 dark:text-gray-400 ">
                  {diary.date.toLocaleString('zh-CN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <div className="flex gap-2 line-clamp-1">
                  {editingId === diary.id ? (
                    <>
                      <Button 
                        onClick={saveEdit}
                        title="保存"
                      >
                        ✓
                      </Button>
                      <Button 
                        onClick={cancelEdit}
                        title="取消"
                      >
                        ✕
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        onClick={() => startEdit(diary)}
                        title="编辑"
                      >
                        ✎
                      </Button>
                      <Button 
                        onClick={() => deleteDiary(diary.id)}
                        title="删除"
                      >
                        ✕
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {editingId === diary.id ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-lg resize-none h-24 bg-gray-50 dark:bg-slate-600 dark:text-white"
                />
              ) : (
                <p className="dark:text-gray-200 whitespace-pre-wrap text-wrap break-inside-auto overflow-hidden">{diary.content}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}