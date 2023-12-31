'use client';

import ErrorModal from '@components/Modal/ErrorModal';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorModal
      pageError={error}
      title='Bead Page Error'
      errorButton={{
        reset,
        name: '새로고침',
      }}
    />
  );
}
