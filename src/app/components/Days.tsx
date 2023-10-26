import dayjs from 'dayjs';
import { Children } from 'react';
var relativeTime = require('dayjs/plugin/relativeTime')
var updateLocale = require('dayjs/plugin/updateLocale')


dayjs.extend(relativeTime)

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "还有 %s",
    past: "%s 之前",
    s: '几秒钟',
    m: "%d 分钟",
    mm: "%d 分钟",
    h: "%d 小时",
    hh: "%d 小时",
    d: "%d 天",
    dd: "%d 天",
    M: "%d 月",
    MM: "%d 月",
    y: "%d 年",
    yy: "%d 年"
  }
})

export default function Days(props){
  const tmp = dayjs().to(dayjs(props.time))
  return tmp

}
