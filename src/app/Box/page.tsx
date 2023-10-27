import 'server-only';

import dynamic from 'next/dynamic';

import Skeleton from '@components/Skeleton';
const Box = dynamic(() => import('@components/Box'), {
  ssr: false,
  loading: () => (
    <Skeleton message='세계를 그리는 중..' backgroundColor='white' />
  ),
});

// import styles from './box.module.scss';
// import classnames from 'classnames/bind';
// const cx = classnames.bind(styles);

export default function Page() {
  return <Box />;
}
