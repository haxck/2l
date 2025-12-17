import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 纪念日接口
interface CommemorationItem {
  id: string;
  title: string;
  date: Date;
}

// 日记接口
interface DiaryItem {
  id: string;
  date: Date;
  content: string;
}

// 地点接口
interface PlaceItem {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  date: { from: Date; to: Date };
}

interface StoreState {
  // 纪念日相关状态
  commemorations: CommemorationItem[];
  addCommemoration: (title: string, date: Date) => void;
  deleteCommemoration: (id: string) => void;
  
  // 日记相关状态
  diaries: DiaryItem[];
  addDiary: (content: string) => void;
  deleteDiary: (id: string) => void;
  
  // 地点相关状态
  places: PlaceItem[];
  addPlace: (name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => void;
  deletePlace: (id: string) => void;
  editPlace: (id: string, name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => void;
}

// 创建状态管理 store
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // 初始状态
      commemorations: [],
      diaries: [],
      places: [],
      
      // 纪念日相关 actions
      addCommemoration: (title, date) => set((state) => {
        const newItem = { id: Date.now().toString(), title, date };
        return {
          commemorations: [newItem, ...state.commemorations]
        };
      }),
      
      deleteCommemoration: (id) => set((state) => ({
        commemorations: state.commemorations.filter(item => item.id !== id)
      })),
      
      // 日记相关 actions
      addDiary: (content) => set((state) => {
        const newDiary = { id: Date.now().toString(), date: new Date(), content };
        return {
          diaries: [newDiary, ...state.diaries]
        };
      }),
      
      deleteDiary: (id) => set((state) => ({
        diaries: state.diaries.filter(item => item.id !== id)
      })),
      
      // 地点相关 actions
      addPlace: (name, description, lat, lng, date) => set((state) => {
        const newPlace = { id: Date.now().toString(), name, description, lat, lng, date };
        return {
          places: [newPlace, ...state.places]
        };
      }),
      
      deletePlace: (id) => set((state) => ({
        places: state.places.filter(item => item.id !== id)
      })),
      
      editPlace: (id: string, name: string, description: string, lat: number, lng: number, date: { from: Date; to: Date }) => set((state) => ({
        places: state.places.map(item => 
          item.id === id ? { ...item, name, description, lat, lng, date } : item
        )
      })),
    }),
    {
      name: 'app-storage', // localStorage 中的键名
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (item) {
            return JSON.parse(item, (_, value) => {
              if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
                return new Date(value);
              }
              return value;
            });
          }
          return null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value, (_, value) => {
            if (value instanceof Date) {
              return value.toISOString();
            }
            return value;
          }));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
