import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';


dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

const dayjsWithLocale = dayjs as any;
dayjsWithLocale.updateLocale('en', {
  relativeTime: {
    future: "还有 %s",
    past: "%s前",
    s: '几秒钟',
    m: "1 分钟",
    mm: "%d 分钟",
    h: "1 小时",
    hh: "%d 小时",
    d: "1 天",
    dd: "%d 天",
    M: "1 个月",
    MM: "%d 个月",
    y: "1 年",
    yy: "%d 年"
  }
})

interface DaysProps {
  time: string;
}

export default function Days(props: DaysProps) {
  const tmp = dayjs().to(dayjs(props.time))
  return <span>{tmp}</span>

}
