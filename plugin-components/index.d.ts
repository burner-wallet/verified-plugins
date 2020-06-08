export interface Components {
  AssetSelector: React.ComponentType<{ asset: string, onChange: (asset: string) => void }>;
}

export interface PluginEditorProps {
  pluginWalletData: any;
  pluginUserData: any;
  components: Components;
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

declare const plugins: { [id: string]: PluginComponents };

export default plugins;
