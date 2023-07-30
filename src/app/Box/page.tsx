import 'server-only';

import { Suspense } from 'react';

import Skelton from '@component/Skelton';
import Box from '@component/Box';

// import styles from './box.module.scss';
// import classnames from 'classnames/bind';
// const cx = classnames.bind(styles);

export default function Page() {
  return (
    <Suspense fallback={<Skelton message='세계를 그리는 중..' />}>
      <Box />
    </Suspense>
  );
}
