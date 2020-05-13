export default {
  id: 'vendor',
  name: 'Vendor',
  package: '@burner-factory/vendor-plugin',
  version: '^0.1.3',
  getIncomplete(data) {
    if (!data.pluginWalletData.menuId) {
      return 'Select a menu';
    }
  },
  getArgs(data) {
    return data.pluginWalletData.menuId;
  },
};
