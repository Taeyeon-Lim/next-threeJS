// for. next/Link
export const newSearchParams = (
  searchParams: {
    [key: string]: string | string[] | undefined;
  },
  deleteParams?: string[]
) => {
  const nextSearchParams = new URLSearchParams();

  for (const key in searchParams) {
    const value = searchParams[key];

    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(item => nextSearchParams.append(key, item));
      } else {
        nextSearchParams.set(key, value);
      }
    }
  }

  if (deleteParams) {
    deleteParams.forEach(deleteParam => {
      if (nextSearchParams.has(deleteParam))
        nextSearchParams.delete(deleteParam);
    });
  }

  return nextSearchParams;
};
