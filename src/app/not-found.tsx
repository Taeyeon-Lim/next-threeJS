import Link from 'next/link';
import { CSSProperties } from 'react';

const style: CSSProperties = {
  width: '100%',
  height: '100%',
  fontSize: '1.75rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const linkStyle: CSSProperties = {
  color: 'blue',
};

export default function NotFound() {
  return (
    <div style={style}>
      <h2>404 | Not Found Page</h2>
      <br />
      <p>존재 하지 않는 페이지입니다</p>
      <p>Could not find requested resource</p>
      <br />
      <Link href='/' style={linkStyle}>
        &lt; HOME &gt;
      </Link>
    </div>
  );
}
