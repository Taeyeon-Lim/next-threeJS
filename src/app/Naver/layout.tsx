import 'server-only';

import Theme from '@components/Naver/Theme';

import styles from './naver.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function layout(props: { children: React.ReactNode }) {
  return (
    <section className={cx('naver')}>
      <h2>Naver Open API를 활용한 토이 프로젝트</h2>

      <div className={cx('naver-header')}>
        <Theme />
      </div>

      {props.children}
    </section>
  );
}

export default layout;
