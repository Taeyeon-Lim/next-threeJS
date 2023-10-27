import 'server-only';

import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Totoro = dynamic(() => import('@components/Totoro'), {
  ssr: false,
  loading: () => (
    <Skeleton message='세계를 그리는 중..' backgroundColor='#d9afd9' />
  ),
});
const YouTubePlay = dynamic(() => import('@components/YouTubePlay'), {
  ssr: false,
  loading: () => <></>,
});

export default function Page() {
  return (
    <>
      <Totoro />

      <YouTubePlay
        videoId='asB23WeoyM0'
        start={29}
        end={200}
        loop={1}
        playButton
        autoPlay
      />
    </>
  );
}
