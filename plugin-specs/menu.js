export default {
  id: 'ens',
  name: 'Order Menu',
  package: '@burner-factory/order-menu-plugin',
  getArgs(data) {
    return data.pluginWalletData.menuId;
  },
};
