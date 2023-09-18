export interface Route {
  path: string;
  content: () => JSX.Element;
}
