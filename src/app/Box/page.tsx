import 'server-only';

import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Boxes = dynamic(() => import('@components/Boxes'), {
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
  return <Boxes />;
}
