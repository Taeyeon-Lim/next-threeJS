import MergedOptions from '@components/Naver/SearchTrend/MergedOptions';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <MergedOptions searchParams={searchParams} />;
}
