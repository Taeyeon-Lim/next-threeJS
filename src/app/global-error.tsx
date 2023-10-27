// Catch-all error handling UI

'use client';

import ErrorModal from '@components/Modal/ErrorModal';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang='ko'>
      <body>
        <ErrorModal
          pageError={error}
          title='Application ERROR'
          errorButton={{
            reset,
            name: '새로고침',
          }}
        />
      </body>
    </html>
  );
}
