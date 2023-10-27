import 'server-only';

import ModalControl from '@components/Naver/SearchTrend/ModalControl';
// import { usePathname } from 'next/navigation';

function Layout({
  children,
  keywordModal,
  selectModal,
}: {
  children: React.ReactNode;
  keywordModal: React.ReactNode;
  selectModal: React.ReactNode;
}) {
  // const pathname = usePathname();

  return (
    <>
      {children}
      <ModalControl keywordModal={keywordModal} selectModal={selectModal} />
      {/* {pathname.includes('/Keyword') && keywordModal}
      {pathname.includes('/Select') && selectModal} */}
    </>
  );
}

export default Layout;
