import { CSSProperties } from 'react';

function SimpleSpinner({
  size,
  borderWidth,
}: {
  size?: number;
  borderWidth?: number;
}) {
  const spinnerStyle: CSSProperties = {
    width: size,
    height: size,
    borderWidth,
  };

  return <div className='simple-loader' style={spinnerStyle} />;
}

export default SimpleSpinner;
