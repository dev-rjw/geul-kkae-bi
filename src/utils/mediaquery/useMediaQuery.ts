import { useEffect, useState } from 'react';
import { useMediaQuery } from 'use-media-query-react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    setIsMobile(mobile);
  }, [mobile]);

  return isMobile;
};
