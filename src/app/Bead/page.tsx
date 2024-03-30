import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Bead = dynamic(() => import('@components/Bead'), {
  ssr: false,
  loading: () => (
    <Skeleton
      message='세계를 그리는 중...'
      backgroundColor='#002147'
      color='#FFFFFF'
    />
  ),
});

export default function Page() {
  return <Bead />;
}
