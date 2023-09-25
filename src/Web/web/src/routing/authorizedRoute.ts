import { AuthorizedPageContent } from "../pages/AuthorizedPageContent";
import { throwError } from "../utils/throwError";
import { Route } from "./route";

export class AuthorizedRoute implements Route {
  public path: string;
  public content: () => JSX.Element;

  public constructor({ path, content }: { path?: string; content?: () => JSX.Element }) {
    this.path = path ?? throwError("Path cannot be null.");

    if (content === undefined) {
      throw new Error("Content cannot be null.");
    }

    this.content = () => AuthorizedPageContent({ children: () => content() });
  }
}
