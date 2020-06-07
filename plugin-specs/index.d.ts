export interface PluginDef {
  id: string;
  name: string;
  description: string;
  package: string;
  version: string;
  getIncomplete?: (data: any) => string | undefined | null;
  getArgs?: (data: any) => string | string[];
}

declare const plugins: PluginDef[];

export default plugins;
