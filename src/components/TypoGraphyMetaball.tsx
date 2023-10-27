'use client';

import React, { useEffect, useRef } from 'react';

function TypoGraphyMetaball({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null);
  const textFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const textFilter = textFilterRef.current;
    if (!text || !textFilter) return;

    let isPause = false;
    const morphTime = 4;
    const delay = 500;
    let time: any = new Date();
    let morph = 2;
    let cooldown = 0;

    function doMorph() {
      const text = textRef.current;
      const textFilter = textFilterRef.current;
      if (!text || !textFilter) return;

      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        fraction = 1;
        isPause = true;
      }

      const min_blur = Math.min(8 / fraction - 8, 100);

      text.style.filter = `blur(${min_blur}px)`;
      text.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      if (min_blur === 0) {
        textFilter.style.filter = `none`;
      } else {
        textFilter.style.filter = `url(#threshold) blur(0.5px)`;
      }
    }

    let timeId = 0;

    const animate = () => {
      if (isPause) {
        cancelAnimationFrame(timeId);
        return;
      }
      const text = textRef.current;
      const textFilter = textFilterRef.current;
      if (!text || !textFilter) return;

      let newTime: any = new Date();
      let dt = (newTime - time) / delay;

      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        doMorph();
      } else {
        morph = 0;
      }

      timeId = requestAnimationFrame(animate);
    };

    timeId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(timeId);
    };
  }, []);

  return (
    <>
      <div ref={textFilterRef}>
        <div ref={textRef}>{text}</div>
      </div>

      <svg
        style={{
          width: 0,
          height: 0,
          position: 'absolute',
          zIndex: -1,
        }}
      >
        <defs>
          <filter id='threshold'>
            <feColorMatrix
              in='SourceGraphic'
              type='matrix'
              values='
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140
                    '
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default TypoGraphyMetaball;
