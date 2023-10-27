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
      errorMsg={error.message.split('->')[1] || undefined}
      title='SearchTrend Page Error'
      errorButton={{
        reset,
        name: '새로고침',
      }}
    />
  );
}
