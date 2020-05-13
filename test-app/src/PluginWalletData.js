export default class PluginWalletData {
  constructor(wallet, plugin, data = {}) {
    Object.assign(this, data);

    this.update = async (newData) => {
      PluginWalletData.update(wallet, plugin, newData);
    };
  }
}
