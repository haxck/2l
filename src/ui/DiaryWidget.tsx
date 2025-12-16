import { useState, useEffect } from 'react';

interface DiaryItem {
  id: string;
  date: Date;
  content: string;
}

export default function DiaryWidget() {
  const [diaries, setDiaries] = useState<DiaryItem[]>([]);


  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  // 从localStorage加载日记
  const loadDiaries = () => {
    const stored = localStorage.getItem('diaries');
    if (stored) {
      const parsed = JSON.parse(stored);
      const converted = parsed.map((item: any) => ({
        ...item,
        date: new Date(item.date)
      }));
      setDiaries(converted.sort((a: DiaryItem, b: DiaryItem) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  };

  // 初始加载和监听数据变化
  useEffect(() => {
    loadDiaries();
    
    // 监听localStorage变化（跨标签页同步）
    const handleStorageChange = () => {
      loadDiaries();
    };
    
    // 监听自定义事件（同一标签页内同步）
    const handleDiaryUpdated = () => {
      loadDiaries();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('diaryUpdated', handleDiaryUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('diaryUpdated', handleDiaryUpdated);
    };
  }, []);

  // 组件内部修改日记时，手动调用loadDiaries确保同步
  useEffect(() => {
    // 当组件内部修改日记时，这个effect不会触发，因为我们直接修改localStorage
    // 但为了安全起见，我们可以在这里添加额外的同步逻辑
  }, [diaries]);



  // 删除日记
  const deleteDiary = (id: string) => {
    // 获取现有日记
    const stored = localStorage.getItem('diaries');
    if (stored) {
      const diariesData = JSON.parse(stored);
      const updated = diariesData.filter((diary: DiaryItem) => diary.id !== id);
      localStorage.setItem('diaries', JSON.stringify(updated));
      
      // 重新加载日记以确保同步
      loadDiaries();
    }
  };

  // 开始编辑日记
  const startEdit = (diary: DiaryItem) => {
    setEditingId(diary.id);
    setEditingContent(diary.content);
  };

  // 保存编辑
  const saveEdit = () => {
    if (!editingId || !editingContent.trim()) return;
    
    // 获取现有日记
    const stored = localStorage.getItem('diaries');
    if (stored) {
      const diariesData = JSON.parse(stored);
      const updated = diariesData.map((diary: DiaryItem) => 
        diary.id === editingId 
          ? { ...diary, content: editingContent.trim(), date: new Date() } 
          : diary
      );
      localStorage.setItem('diaries', JSON.stringify(updated));
      
      // 重新加载日记以确保同步
       loadDiaries();
       
       // 触发自定义事件，通知其他组件数据已更新
       window.dispatchEvent(new CustomEvent('diaryUpdated'));
       
       setEditingId(null);
       setEditingContent('');
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent('');
  };

  return (
    <div className="words dark:bg-slate-800 bg-slate-100 opacity-90 rounded-xl border border-gray-600/10 p-4 shadow-xl shadow-gray-400/10 transition-all duration-300 dark:shadow-black/0 my-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">日记</h3>
      </div>

      {/* 日记列表 */}
      <div className="space-y-3">
        {diaries.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            还没有日记，点击右下角开始写日记吧~</p>
        ) : (
          diaries.map(diary => (
            <div 
              key={diary.id} 
              className="p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 ">
                  {diary.date.toLocaleString('zh-CN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <div className="flex space-x-1 text-wrap">
                  {editingId === diary.id ? (
                    <>
                      <button 
                        onClick={saveEdit}
                        className="p-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        title="保存"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="p-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        title="取消"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => startEdit(diary)}
                        className="p-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        title="编辑"
                      >
                        ✎
                      </button>
                      <button 
                        onClick={() => deleteDiary(diary.id)}
                        className="p-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        title="删除"
                      >
                        ✕
                      </button>
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
                <p className="text-sm dark:text-gray-200 whitespace-pre-wrap text-wrap break-inside-auto overflow-hidden">{diary.content}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}