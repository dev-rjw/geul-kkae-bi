'use client';

import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface PercentGraphProps {
  thisWeek?: string | null;
  lastWeek?: string | null;
  className?: string | null;
}

const PercentGraph: React.FC<PercentGraphProps> = ({ thisWeek, lastWeek, className }) => {
  const [thisWeekProgress, setThisWeekProgress] = useState(13);
  const [lastWeekProgress, setLastWeekProgress] = useState(13);

  const changeThisWeekToNum = Number(thisWeek ?? 0);
  const changeLastWeekToNum = Number(lastWeek ?? 0);

  useEffect(() => {
    const thisWeekTimer = setTimeout(() => setThisWeekProgress(changeThisWeekToNum), 500);
    const lastWeekTimer = setTimeout(() => setLastWeekProgress(changeLastWeekToNum), 500);
    return () => {
      clearTimeout(thisWeekTimer);
      clearTimeout(lastWeekTimer);
    };
  }, [changeThisWeekToNum, changeLastWeekToNum]);

  return (
    <div className={`flex flex-col gap-5 w-full ${className}`}>
      <Progress
        value={thisWeekProgress}
        className='h-8 rounded-sm [&>div]:bg-primary-400 bg-primary-300'
      />
      <Progress
        value={lastWeekProgress}
        className='h-8 rounded-sm [&>div]:bg-primary-300 bg-primary-200'
      />
    </div>
  );
};

export default PercentGraph;
