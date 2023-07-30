import 'server-only';

import dynamic from 'next/dynamic';

import Skelton from '@components/Skelton';
const Box = dynamic(() => import('@components/Box'), {
  ssr: false,
  loading: () => (
    <Skelton message='세계를 그리는 중..' backgroundColor='white' />
  ),
});

// import styles from './box.module.scss';
// import classnames from 'classnames/bind';
// const cx = classnames.bind(styles);

export default function Page() {
  return <Box />;
}
