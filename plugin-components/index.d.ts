export interface PluginEditorProps {
  plugin: any;
  pluginWalletData: any;
  pluginUserData: any;
  components: any;
}

export interface PluginEditor {
  label: string;
  component: React.ComponentType<PluginEditorProps>;
}

export interface PluginDashboards {
}

export interface PluginComponents {
  editors: PluginEditor[];
  dashboards: PluginDashboards[];
}

declare const plugins: { [id: string]: PluginEditors };

export default plugins;
