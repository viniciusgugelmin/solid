import { IView } from "../../views/ViewDTO";

interface ITemplateEngineProvider {
  compile(template: IView): string;
}

export { ITemplateEngineProvider };
