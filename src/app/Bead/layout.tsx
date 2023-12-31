import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bead',
};

function layout(props: { children: React.ReactNode }) {
  return <section>{props.children}</section>;
}

export default layout;
