import carbon from './carbon';
import collectables from './collectables';
import ens from './ens';
import linkdrop from './linkdrop';
import menu from './menu';

const plugins = [
  ens,
  menu,
  carbon,
  collectables,
  linkdrop,
  {
    id: 'metamask',
    name: 'Metamask',
    description: 'Users in a Metamask or Web3 browser can connect their local account',
    default: false,
    package: '@burner-wallet/metamask-plugin',
    version: '^1.0.0',
  },
  // {
  //   id: 'link',
  //   name: 'Links',
  //   description: 'Send tokens by a URL',
  //   disabled: true,
  // },
  // {
  //   id: 'legacy',
  //   name: 'Legacy Support',
  //   description: 'Support URLs and keys from the Burner Wallet 1.0',
  //   disabled: true,
  // },
  // {
  //   id: 'exchange',
  //   name: 'Exchange',
  //   description: 'Convert between asset types (exchange on Uniswap, use xDai bridge, etc)',
  //   default: true,
  // },
  {
    id: 'erc681',
    name: 'ERC681 - Transaction Request Protocol',
    description: 'Accept payment request QR codes from other wallets',
    package: '@burner-wallet/erc681-plugin',
    version: '^1.0.0',
    default: true,
  },
  {
    id: 'recentAccounts',
    name: 'Recent Accounts',
    description: 'Suggest recent addresses to the user when sending a transaction',
    package: '@burner-wallet/recent-accounts-plugin',
    version: '^1.0.0',
    default: true,
  },
  {
    id: 'push',
    name: 'Push Notifications',
    description: 'Send messages directly to users',
    package: '@burner-factory/push-notification-plugin',
    version: '^0.1.0',
    beta: true,
  },
];

export default plugins;
