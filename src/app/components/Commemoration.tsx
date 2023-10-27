"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules'
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Days from './Days';

export default function Commemoration(items) {
  if(items.commemorations.length === 0) return ""
  return <>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      effect={'cards'}
      loop={true}
      grabCursor={true}
      modules={[EffectCards]}
      className='mb-4'
    >

      {items.commemorations.toReversed().map((data, index) => {
        return <>
          <SwiperSlide key={data.title} >
            <Card className="py-4 bg-slate-100 rounded-xl border">
              <CardHeader className=" pb-0 pt-2 px-5 flex-col justify-center items-center">
                <p className="text-2xl uppercase font-bold text-default-600">{data.title}</p>
                <small className="text-default-500">{data.time}</small>
                <h4 className="font-bold text-large ">
                  {Days(data)}
                </h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">

              </CardBody>
            </Card>
          </SwiperSlide>

        </>
      })}
    </Swiper>

  </>
}