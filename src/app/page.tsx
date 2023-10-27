import 'server-only';

import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Television = dynamic(() => import('@components/Home'), {
  ssr: false,
  loading: () => (
    <Skeleton message='세계를 그리는 중..' backgroundColor='black' />
  ),
});

import styles from './home.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export default function Home() {
  return (
    <section className={cx('home')}>
      <Television />
    </section>
  );

  // <Image
  //   style={{
  //     objectFit: 'contain',
  //     display: 'block',
  //   }}
  //   src={'/cat.jpeg'} // static image
  //   alt={'cat'}
  //   fill
  //   sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  //   quality={90}
  //   placeholder='blur'
  //   blurDataURL={PLACEHOLDER_BASE64_IMAGE}
  // />;
}
