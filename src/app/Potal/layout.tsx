import { Metadata } from 'next';

import styles from './potal.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export const metadata: Metadata = {
  title: 'Potal',
};

function layout(props: { children: React.ReactNode }) {
  return <section className={cx('potal')}>{props.children}</section>;
}

export default layout;
