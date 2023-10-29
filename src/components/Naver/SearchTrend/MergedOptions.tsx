import Keywords from './Keywords';
import Selects from './Selects';

import styles from '@components/Naver/SearchTrend/mergedOptions.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

/**
 *
 * @use /keyword 페이지, /select 페이지
 */
function MergedOptions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className={cx('merged-modal')}>
      <div className={cx('merged-modal_position')}>
        <div>
          <p>
            ☝ 추가된 그룹 <span>(클릭 시, 변경)</span>
          </p>

          <Keywords searchParams={searchParams} isReplace />
        </div>

        <hr />

        <div>
          <p>✌ 옵션</p>

          <Selects searchParams={searchParams} isReplace />
        </div>
      </div>
    </div>
  );
}

export default MergedOptions;
