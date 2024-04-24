import { robotoBold } from '@/utils/font';

interface TimeTipProps {
  time: Date;
  className?: string;
}

function TimeTip({ time, className }: TimeTipProps) {
  const timeString = Intl.DateTimeFormat('ja-JP', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(time);
  return <div className={`${robotoBold.className} text-sm text-logo text-center w-10 ${className}`}>{timeString}</div>;
}

export default TimeTip;
