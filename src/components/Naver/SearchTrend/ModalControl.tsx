'use client';

import { usePathname } from 'next/navigation';

function ModalControl({
  keywordModal,
  selectModal,
}: {
  keywordModal: React.ReactNode;
  selectModal: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname.includes('/Keyword') && keywordModal}
      {pathname.includes('/Select') && selectModal}
    </>
  );
}

export default ModalControl;
