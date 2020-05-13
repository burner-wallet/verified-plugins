export default {
  id: 'carbon',
  name: 'Carbon',
  description: 'Purchase crypto using credit cards',
  package: '@burner-wallet/carbon-plugin',
  getIncomplete(data) {
    if (!data.config.CARBON_KEY) {
      return 'Carbon is not configured';
    }
  },
  getArgs(data) {
    if (!data.config.CARBON_KEY) {
      throw new Error('Carbon key missing');
    }
    return [data.config.CARBON_KEY, 'production'];
  },
  version: '1.0.3',
};
