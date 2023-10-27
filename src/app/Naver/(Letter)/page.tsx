import 'server-only';

import { Metadata } from 'next';

const promise = async () => {
  return await new Promise(res => setTimeout(res, 2500));
};

export const metadata: Metadata = {
  title: 'Naver',
};

export default async function Page() {
  await promise();

  // 글자 떨어지는 효과
  //  https://codesandbox.io/s/8j36ok?file=/src/App.js:1551-1690

  // Next.js 프리즘 효과
  // https://vercel.com/blog/building-an-interactive-webgl-experience-in-next-js
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'tomato',
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: 700,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      접근 할 수 없는 페이지입니다
    </div>
  );
}
