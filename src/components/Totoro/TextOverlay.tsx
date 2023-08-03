import { CSSProperties, useRef } from 'react';

import { Scroll, useScroll } from '@react-three/drei';

import styles from '@app/Totoro/totoro.module.scss';
import classnames from 'classnames/bind';
import { useFrame } from '@react-three/fiber';
const cx = classnames.bind(styles);

function TextOverlay() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const p1Ref = useRef<HTMLElement | null>(null);
  const p2Ref = useRef<HTMLElement | null>(null);
  const p3Ref = useRef<HTMLElement | null>(null);

  const scroll = useScroll();

  useFrame(() => {
    if (!titleRef.current) return;
    titleRef.current.style.opacity = (1 - scroll.range(0, 1 / 9)).toString();

    if (!p1Ref.current) return;
    p1Ref.current.style.opacity = scroll.curve(1 / 9, 1 / 6).toString();

    if (!p2Ref.current) return;
    p2Ref.current.style.opacity = scroll.curve(1 / 4, 1 / 4).toString();

    if (!p3Ref.current) return;
    p3Ref.current.style.opacity = scroll.range(1.75 / 3, 1.25 / 3).toString();
  });

  return (
    <Scroll html>
      <section className={cx('totoro-texts')}>
        <h1 ref={titleRef}>
          {"JO'HSIS".split('').map((char, i) => {
            if (char === ' ') {
              return <br key={'scroll-title' + i} />;
            }
            return (
              <div
                key={'scroll-title' + i}
                className={cx('letter')}
                style={{ '--delay': `${i * 0.2}s` } as CSSProperties}
              >
                <span className={cx('source')}>{char}</span>
                <span className={cx('shadow')}>{char}</span>
                <span className={cx('overlay')}>{char}</span>
              </div>
            );
          })}
        </h1>

        <article className={cx('paragraph')} ref={p1Ref}>
          <h3>{'Hisaishi Joe (1950, JAPAN)'}</h3>

          {[
            '음악가이자 작곡가이자 지휘자인 일본인.',
            '현대 클래식 작곡의 거장 중 한 명이다',
            '대표작은 [인생의 회전목마], [언제나 몇번이라도] 등이 있다',
          ].map(text => (
            <p key={'single_paragraph_' + text}>{text}</p>
          ))}
        </article>

        <article className={cx('paragraph')} ref={p2Ref}>
          <h3>{'Path of the wind (from My Neighbour Totoro - OST)'}</h3>

          {[
            '바람이 지나는 길 - 히사이시 조',
            '재생되고 있는 곡의 이름.',
            '히사이시 조가 작곡하여 애니메이션 이웃집 토토로에 수록된 OST 중 하나다',
          ].map(text => (
            <p key={'single_paragraph_' + text}>{text}</p>
          ))}
        </article>

        <article className={cx('paragraph')} ref={p3Ref}>
          <h3>{'이웃집 토토로 (My Neighbour Totoro)'}</h3>

          {[
            '흘러나오는 곡의 애니메이션 제목.',
            '비밀이 가득한 집, 굉장한데..!',
            '상냥하고 의젓한 사츠키와 장난꾸러기에 호기심 많은 메이는 사이좋은 자매다',
            '자매에게는 도쿄에서 대학 연구원으로 일하는 자상한 아빠와 지금은 입원 중인 따뜻한 엄마가 있다',
            '엄마의 병세가 호전되자, 자매는 아빠와 함께 엄마의 요양을 위해 한적한 시골로 이사하게 되고,',
            "시골 숲 속을 헤매다 도토리 나무의 요정 '토토로'를 만나게 되는데...",
          ].map(text => (
            <p key={'single_paragraph_' + text}>{text}</p>
          ))}
        </article>
      </section>
    </Scroll>
  );
}

export default TextOverlay;
