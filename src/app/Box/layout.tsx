import { Metadata } from 'next';

import styles from './box.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export const metadata: Metadata = {
  title: 'Box',
};

function layout(props: { children: React.ReactNode }) {
  return <section className={cx('box')}>{props.children}</section>;
}

export default layout;
