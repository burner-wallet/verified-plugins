export default {
  id: 'menu',
  name: 'Order Menu',
  package: '@burner-factory/order-menu-plugin',
  getArgs(data) {
    return data.pluginWalletData.menuId;
  },
};
