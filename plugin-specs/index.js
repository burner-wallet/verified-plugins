import ens from './ens';
import menu from './menu';

const plugins = [
  ens,
  menu,
  {
    id: 'metamask',
    name: 'Metamask',
    description: 'Users in a Metamask or Web3 browser can connect their local account',
    default: true,
  },
  {
    id: 'link',
    name: 'Links',
    description: 'Send tokens by a URL',
    disabled: true,
  },
  {
    id: 'legacy',
    name: 'Legacy Support',
    description: 'Support URLs and keys from the Burner Wallet 1.0',
    disabled: true,
  },
  {
    id: 'exchange',
    name: 'Exchange',
    description: 'Convert between asset types (exchange on Uniswap, use xDai bridge, etc)',
    default: true,
  },
  {
    id: 'erc681',
    name: 'ERC681 - Transaction Request Protocol',
    description: 'Accept payment request QR codes from other wallets',
    default: true,
  },
  {
    id: 'recentAccounts',
    name: 'Recent Accounts',
    description: 'Suggest recent addresses to the user when sending a transaction',
    default: true,
  },
  {
    id: 'carbon',
    name: 'Carbon',
    description: 'Purchase crypto using credit cards (not available in USA)',
  },
  {
    id: 'linkdrop',
    name: 'Linkdrop',
    description: 'Claim digital assets from URLs or QR codes',
  },
  {
    id: 'push',
    name: 'Push Notifications',
    description: 'Send messages directly to users',
    beta: true,
  },
  {
    id: 'vendor',
    name: 'Vendor Plugin',
    description: 'Accompanies the Order Menu plugin, provides a PoS system',
    beta: true,
  },
  {
    id: 'collectables',
    name: 'Collectables',
    description: 'Create NFTs that users can collect',
    beta: true,
  },
];

export default plugins;
