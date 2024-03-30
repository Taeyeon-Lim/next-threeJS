'use client';

/** 범용 스켈레톤 컴포넌트 */
function Skeleton({
  message,
  backgroundColor,
  color,
}: {
  message: string;
  backgroundColor?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: backgroundColor || 'bisque',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2.5rem',
        color: color || (backgroundColor ? 'white' : 'black'),
      }}
    >
      {message}
    </div>
  );
}

export default Skeleton;
