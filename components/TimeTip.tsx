'use client';
// ユーザーのローカルタイムゾーンを考慮するためクライアントコンポーネント
import { format } from 'date-fns';

import { robotoBold } from '@/utils/font';

interface TimeTipProps {
  time: Date;
  className?: string;
}

function TimeTip({ time, className }: TimeTipProps) {
  const timeString = format(time, 'HH:mm');
  return <div className={`${robotoBold.className} text-sm text-logo text-center w-10 ${className}`}>{timeString}</div>;
}

export default TimeTip;
