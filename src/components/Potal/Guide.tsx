import { useState, Fragment, ReactNode, MouseEvent } from 'react';

import { BiQuestionMark, BiX } from 'react-icons/bi';
import { BsExplicitFill } from 'react-icons/bs';
import { FaKorvue } from 'react-icons/fa';

import styles from '@app/Potal/potal.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const KOR_MOSETER_GUIDE: {
  [key: string]: ReactNode;
} = {
  머쉬룸: (
    <Fragment key={'머쉬룸'}>
      <p>- 버섯형 몬스터</p>
      <p>- 온 몸에 버섯이 뿔처럼 자란 형태를 가진 몬스터이다</p>
      <p>- 한 손에 긴 팽이버섯을 들고 있는 것이 특징</p>
    </Fragment>
  ),
  칵투스: (
    <Fragment key={'칵투스'}>
      <p>- 선인장형 몬스터</p>
      <p>- 선인장처럼 온 몸에 가시를 가진 몬스터이다</p>
      <p>- 멕시코 모자를 쓰고 있는 것이 특징</p>
    </Fragment>
  ),
  예티: (
    <Fragment key={'예티'}>
      <p>- 설인형 몬스터</p>
      <p>- 온 몸이 하얗고, 덩치에 비해 힘이 쎈 몬스터이다</p>
      <p>- 사계절 내내 눈 덮인 곳에만 서식하는 것이 특징</p>
    </Fragment>
  ),
};
const ENG_MOSETER_GUIDE: {
  [key: string]: ReactNode;
} = {
  Mushroom: (
    <Fragment key={'Mushroom'}>
      <p>- Mushroom type monster</p>
      <p>
        - It is a monster in the form of mushrooms growing like horns all over
        its body
      </p>
      <p>- It is characterized by holding a long enoki mushroom in one hand</p>
    </Fragment>
  ),
  Cactus: (
    <Fragment key={'Cactus'}>
      <p>- Cactus type monster</p>
      <p>- It is a monster with thorns all over its body like a cactus.</p>
      <p>- It is characterized by wearing a Mexican hat.</p>
    </Fragment>
  ),
  Yeti: (
    <Fragment key={'Yeti'}>
      <p>- Snowman type monster</p>
      <p>
        - It is a monster that is white all over and strong compared to its
        size.
      </p>
      <p>
        - It is characterized by living only in snowy areas throughout the four
        seasons.
      </p>
    </Fragment>
  ),
};

function Guide({
  hovered,
  activeWorldName,
}: {
  hovered: string;
  activeWorldName: string;
}) {
  const [engName, korName] = hovered.split(',');

  const [isKor, setIsKor] = useState(true);
  const handleIsKor = (e: MouseEvent<SVGElement>) => (
    e.stopPropagation(), setIsKor(prev => !prev)
  );

  const [isClose, setIsClose] = useState(false);
  const handleIsClose = () => setIsClose(prev => !prev);

  if (isKor) {
    return (
      <div
        className={cx('potal-guide', {
          'close-guide': isClose,
        })}
      >
        {hovered === '' || isClose ? (
          <>
            <div className={cx('guide-header')} onClick={handleIsClose}>
              <h6>{isClose ? '다시 열기' : '안내'}</h6>

              <span>
                <FaKorvue
                  className={cx('language-icon')}
                  onClick={handleIsKor}
                />
                <BiX className={cx('x-icon')} />
              </span>
            </div>

            {activeWorldName === '' ? (
              <Fragment key={'kor_none_activeWorldName'}>
                <p>더블 클릭 : 해당 몬스터 세계로 들어가기</p>
                <p>카드 내부에 커서 : 간단한 행동 보기</p>
                <p>드래그 : 시야 이동</p>
              </Fragment>
            ) : (
              <Fragment key={'kor_activeWorldName'}>
                <p>더블 클릭 : 뒤로가기</p>
                <p>몬스터 클릭 : 다른 행동 보기</p>
                <p>드래그 : 시야 이동</p>
              </Fragment>
            )}
          </>
        ) : (
          <>
            <div className={cx('guide-header')}>
              <h6>{korName}</h6>

              <BiQuestionMark />
            </div>

            {KOR_MOSETER_GUIDE[korName] || <p>알 수 없는 몬스터</p>}
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cx('potal-guide', {
        'close-guide': isClose,
      })}
    >
      {hovered === '' || isClose ? (
        <>
          <div className={cx('guide-header')} onClick={handleIsClose}>
            <h6>{isClose ? 'Reopen' : 'Guide'}</h6>

            <span>
              <BsExplicitFill
                className={cx('language-icon')}
                onClick={handleIsKor}
              />
              <BiX className={cx('x-icon')} />
            </span>
          </div>

          {activeWorldName === '' ? (
            <Fragment key={'eng_none_activeWorldName'}>
              <p>Double Click : Enter that monster world</p>
              <p>Move cursor inside card : View Simple Actions</p>
              <p>Drag : Movement of field of view</p>
            </Fragment>
          ) : (
            <Fragment key={'eng_activeWorldName'}>
              <p>Double Click : Go back</p>
              <p>Click Monster : See other behaviors</p>
              <p>Drag : Movement of field of view</p>
            </Fragment>
          )}
        </>
      ) : (
        <>
          <div className={cx('guide-header')}>
            <h6>{engName}</h6>

            <BiQuestionMark />
          </div>

          {ENG_MOSETER_GUIDE[engName] || <p>Unknown Monster</p>}
        </>
      )}
    </div>
  );
}

export default Guide;
