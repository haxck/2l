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
    m: "1 分钟",
    mm: "%d 分钟",
    h: "1 小时",
    hh: "%d 小时",
    d: "1 天",
    dd: "%d 天",
    M: "1月",
    MM: "%d 月",
    y: "1 年",
    yy: "%d 年"
    // future: "in %s",
    // past: "%s ago",
    // s: 'a few seconds',
    // m: "a minute",
    // mm: "%d minutes",
    // h: "an hour",
    // hh: "%d hours",
    // d: "a day",
    // dd: "%d days",
    // M: "a month",
    // MM: "%d months",
    // y: "a year",
    // yy: "%d years"
  }
})

export default function Days(props){
  const tmp = dayjs().to(dayjs(props.time))
  return tmp

}
