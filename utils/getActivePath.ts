export default function getActivePath(path: string, pathname: string, asPath: string) {
  return pathname.includes(path) || asPath.includes(path)
}
