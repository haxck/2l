"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { EffectCards } from 'swiper/modules'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Days from './Days';
import dayjs from 'dayjs';

interface CommemorationItem {
  title: string;
  time: string;
}

interface CommemorationProps {
  commemorations: CommemorationItem[];
  delCommemoration: (index: number) => void;
}

export default function Commemoration({ commemorations, delCommemoration }: CommemorationProps) {

  if (commemorations.length === 0) return <></>
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards]}
      className='mb-4'
    >
      {commemorations.map((data: CommemorationItem, index: number) => {
        return (
          <SwiperSlide key={data.title}>
            <Card className="py-4 bg-slate-100 rounded-xl dark:bg-slate-800 opacity-95">
              <CardHeader className=" pb-0 pt-2 px-5 flex-col justify-center items-center ">
                <Button variant="destructive" size="icon" onClick={()=>{delCommemoration(index)}} className='absolute right-3 top-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                  </svg>
                </Button>
                <p className="text-2xl uppercase font-bold text-gray-600 dark:text-slate-400">{data.title}</p>
                <small className="text-gray-500">{data.time}</small>
              </CardHeader>
              <CardContent className="overflow-visible py-2 justify-center items-center">
                <h4 className="font-bold text-large ">
                  {Days({ time: data.time })} ({Math.abs(dayjs(data.time).diff(dayjs(new Date()), 'day'))} 天)
                </h4>
              </CardContent>
            </Card>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}