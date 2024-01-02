import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Box',
};

function layout(props: { children: React.ReactNode }) {
  return <section>{props.children}</section>;
}

export default layout;
