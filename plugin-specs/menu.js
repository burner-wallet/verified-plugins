export default {
  id: 'menu',
  name: 'Order Menu',
  package: '@burner-factory/order-menu-plugin',
  getIncomplete(data) {
    if (!data.pluginWalletData.menuId) {
      return 'Select a menu';
    }
  },
  getArgs(data) {
    return data.pluginWalletData.menuId;
  },
};
