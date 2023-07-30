'use client'; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // useEffect(() => {
  //   console.error(error);
  // }, [error]);

  return (
    <>
      <h2>Box ERROR..!</h2>
      <button onClick={() => reset()}>Try again</button>
    </>
  );
}
