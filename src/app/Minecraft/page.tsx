import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Minecraft = dynamic(() => import('@components/Minecraft'), {
  ssr: false,
  loading: () => (
    <Skeleton
      message='세계를 그리는 중..'
      backgroundColor='#FFFFFF'
      color='#000000'
    />
  ),
});

export default function Page() {
  return <Minecraft />;
}
