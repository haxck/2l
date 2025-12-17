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
  time: string | Date;
}

export default function Days(props: DaysProps) {
  // 尝试解析日期，确保dayjs能正确处理
  const date = dayjs(props.time);
  if (!date.isValid()) {
    return <span>无效日期</span>;
  }
  const tmp = dayjs().to(date);
  return <span>{tmp}</span>;
}
