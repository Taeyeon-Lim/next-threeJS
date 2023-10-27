import 'server-only';

import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Potal = dynamic(() => import('@components/Potal'), {
  ssr: false,
  loading: () => (
    <Skeleton
      message='세계를 그리는 중..'
      backgroundColor='white'
      color='purple'
    />
  ),
});

export default function Page() {
  return <Potal />;
}
