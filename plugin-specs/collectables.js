export default {
  id: 'collectables',
  name: 'Collectables',
  description: 'Create NFTs that users can collect',
  package: '@burner-factory/collectable-plugin',
  version: '^1.0.1',
  getIncomplete(data) {
    if (!data.pluginWalletData.network || !data.pluginWalletData.address) {
      return 'No collectable selected';
    }
  },
  getArgs(data) {
    return [data.pluginWalletData.network, data.pluginWalletData.address];
  }
};
