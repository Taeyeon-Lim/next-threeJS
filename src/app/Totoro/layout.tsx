import { Metadata } from 'next';

import styles from './totoro.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export const metadata: Metadata = {
  title: 'Totoro',
};

function layout(props: { children: React.ReactNode }) {
  return <section className={cx('totoro')}>{props.children}</section>;
}

export default layout;
