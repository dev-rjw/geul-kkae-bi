'use client';

import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface PercentGraphProps {
  thisWeek?: string | null;
  lastWeek?: string | null;
}

const PercentGraph: React.FC<PercentGraphProps> = ({ thisWeek, lastWeek }) => {
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
    <div>
      <div className='w-[500px] p-4 flex items-center justify-center'>
        <Progress
          value={thisWeekProgress}
          className='w-[60%] h-8 rounded-none [&>div]:bg-primary-400 bg-primary-300'
        />
      </div>
      <div className='w-[500px] p-4 flex items-center justify-center'>
        <Progress
          value={lastWeekProgress}
          className='w-[60%] h-8 rounded-none [&>div]:bg-primary-300 bg-primary-200'
        />
      </div>
    </div>
  );
};

export default PercentGraph;
