export const NAVIGATOR_LINKS: Array<{
  path: string;
  name: string;
  createdBy: string;
}> = JSON.parse(JSON.stringify(process.env.navigatorLinks));

export const DOMAIN_URL: string = JSON.parse(
  JSON.stringify(process.env.domainURL)
);
