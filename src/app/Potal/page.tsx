import 'server-only';

import dynamic from 'next/dynamic';

import Skelton from '@components/Skelton';
const Potal = dynamic(() => import('@components/Potal'), {
  ssr: false,
  loading: () => (
    <Skelton message='세계를 그리는 중..' backgroundColor='white' />
  ),
});

export default function Page() {
  return <Potal />;
}
