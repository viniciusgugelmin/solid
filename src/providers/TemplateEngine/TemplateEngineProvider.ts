import { ITemplateEngineProvider } from "./TemplateEngineDTO";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { IView } from "../../views/ViewDTO";

export class TemplateEngineProvider implements ITemplateEngineProvider {
  private engine;
  private viewsBasePath = [__dirname, "..", "..", "views"];

  constructor() {
    this.engine = handlebars;
  }

  compile(template: IView): string {
    const templatePath = template.templateDir.split("/");
    const templateContent = fs
      .readFileSync(path.resolve(...this.viewsBasePath, ...templatePath))
      .toString("utf8");

    const parseTemplate = this.engine.compile(templateContent);

    return parseTemplate(template.variables);
  }
}
