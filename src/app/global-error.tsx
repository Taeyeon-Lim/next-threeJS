// Catch-all error handling UI

'use client';

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
        <h2>Global Error (application 전체 에러)</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
