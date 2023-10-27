import { useState, useEffect, useCallback, RefObject } from 'react';

/** useDrag 예시
 * 
 * >> ex. react 
 *
 *  <ol ref={listRef}>
        <li>사과</li>
        <li>복숭아</li>
        ...
    </ol>


    >> ex. CSS

    ol {
            transform: translate3d(0, 0, 0);
            transition: all ease 0.1s;
    }


    >> ex. using hook

    const OListRef = useRef<HTMLOListElement>(null);
    useDrag(OListRef)
 */

/** 가로 터치 드래그 훅
 * @params listRef: RefObject<HTMLElement>
 */
const useDrag = (listRef: RefObject<HTMLElement>) => {
  const [scrollRange, setScrollRange] = useState(0);
  const [startX, setStartX] = useState(0);
  const [prevScrollX, setPrevScrollX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // Swipe
  const startSwipe = useCallback(
    (event: MouseEvent) => {
      if (isSwiping) return;

      setStartX(() => event.clientX);
      setIsSwiping(() => true);
    },
    [isSwiping]
  );

  const swipe = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isSwiping || !listRef.current) return;
      const list = listRef.current;

      // 드래그 범위 계산
      const nextCursorX = event.clientX;
      const diffCursor = nextCursorX - startX + prevScrollX;

      // << 드래그 << 범위 초과
      if (0 < diffCursor && 0 < diffCursor - prevScrollX) {
        list.style.transform = `translate3d(0, 0, 0)`;
        return;
      }
      // >> 드래그 >> 범위 초과
      if (0 > diffCursor && scrollRange < -diffCursor) {
        list.style.transform = `translate3d(${scrollRange}, 0, 0)`;
        return;
      }

      list.style.transform = `translate3d(${diffCursor}px, 0, 0)`;
      setStartX(() => nextCursorX);
      setPrevScrollX(() => diffCursor);
    },
    [isSwiping, startX, prevScrollX, scrollRange, listRef]
  );

  const endSwipe = useCallback((event: MouseEvent) => {
    setIsSwiping(() => false);
  }, []);

  // Touch boucnding
  const startTouch = useCallback(
    (event: TouchEvent) => {
      if (!listRef.current) return;

      const list: HTMLElement = listRef.current;
      const touch = event.touches[0]; // 터치 좌표
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });

      list.dispatchEvent(mouseEvent);
    },
    [listRef]
  );

  const touch = useCallback(
    (event: TouchEvent) => {
      event.stopPropagation();
      if (!listRef.current) return;

      const list: HTMLElement = listRef.current;
      const touch = event.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      list.dispatchEvent(mouseEvent);
    },
    [listRef]
  );

  const endTouch = useCallback(
    (event: TouchEvent) => {
      if (!listRef.current) return;

      const list: HTMLElement = listRef.current;
      const mouseEvent = new MouseEvent('mouseup', {});
      list.dispatchEvent(mouseEvent);
    },
    [listRef]
  );

  // 이벤트 핸들링
  useEffect(() => {
    if (!listRef.current) return;
    const list: HTMLElement = listRef.current;
    const listWidth = list.clientWidth;
    const listScrollRange = list.scrollWidth - listWidth;

    // 전체 너비 및 스크롤 길이 초기화
    if (!listScrollRange || !listWidth) return;
    setScrollRange(() => listScrollRange);

    // 이벤트 등록
    list.addEventListener('mousedown', startSwipe);
    list.addEventListener('mousemove', swipe);
    list.addEventListener('mouseup', endSwipe);
    list.addEventListener('mouseleave', endSwipe);

    list.addEventListener('touchstart', startTouch, { passive: true });
    list.addEventListener('touchmove', touch, { passive: true });
    list.addEventListener('touchend', endTouch);

    return () => {
      list.removeEventListener('mousedown', startSwipe);
      list.removeEventListener('mousemove', swipe);
      list.removeEventListener('mouseup', endSwipe);
      list.removeEventListener('mouseleave', endSwipe);

      list.removeEventListener('touchstart', startTouch);
      list.removeEventListener('touchmove', touch);
      list.removeEventListener('touchend', endTouch);
    };
  }, [listRef, startSwipe, swipe, endSwipe, startTouch, touch, endTouch]);
};

export default useDrag;
