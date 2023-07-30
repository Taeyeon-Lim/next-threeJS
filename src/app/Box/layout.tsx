import styles from './box.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function layout(props: { children: React.ReactNode }) {
  return <section className={cx('box')}>{props.children}</section>;
}

export default layout;
