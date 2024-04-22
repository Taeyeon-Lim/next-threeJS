import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minecraft',
};

function layout(props: { children: React.ReactNode }) {
  return <section>{props.children}</section>;
}

export default layout;
