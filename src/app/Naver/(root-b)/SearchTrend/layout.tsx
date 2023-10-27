import 'server-only';

import ModalControl from '@components/Naver/SearchTrend/ModalControl';

function Layout({
  children,
  keywordModal,
  selectModal,
}: {
  children: React.ReactNode;
  keywordModal: React.ReactNode;
  selectModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ModalControl keywordModal={keywordModal} selectModal={selectModal} />
    </>
  );
}

export default Layout;
