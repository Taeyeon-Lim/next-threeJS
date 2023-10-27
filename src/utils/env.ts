type NaviPaths = {
  path: string;
  name: string;
  createdBy: string;
  subPaths?: NaviPaths;
}[];

export const NAVIGATOR_LINKS: NaviPaths = JSON.parse(
  JSON.stringify(process.env.navigatorLinks)
);

export const DOMAIN_URL: string = JSON.parse(
  JSON.stringify(process.env.domainURL)
);

export const NAVER_CLIENT: {
  clientID: string;
  secret: string;
} = JSON.parse(JSON.stringify(process.env.naverClient));
