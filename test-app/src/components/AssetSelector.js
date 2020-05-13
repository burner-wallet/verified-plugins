import React, { Fragment, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import AssetSelectorPopup from './AssetSelectorPopup';

const allAssets = [
  { id: 'eth', title: 'ETH', type: 'native', icon: 'https://static.burnerfactory.com/icons/eth.svg' },
  { id: 'dai', title: 'Dai', type: 'erc20', icon: 'https://static.burnerfactory.com/icons/dai.svg' },
  { id: 'xdai', title: 'xDai', type: 'native', icon: 'https://static.burnerfactory.com/icons/xdai.svg' },
];

const AssetSelector = ({ asset, onChange, query }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [_asset] = allAssets.filter(a => a.id === asset);

  return (
    <Fragment>
      <ButtonBase onClick={() => setIsOpen(true)}>
        {_asset ? (
          <Chip
            key={_asset.id}
            avatar={_asset.icon ? <Avatar src={_asset.icon} /> : null}
            label={_asset.title}
          />
        ) : (
          <div>Select an Asset</div>
        )}
      </ButtonBase>

      <AssetSelectorPopup
        onClose={() => setIsOpen(false)}
        onSelect={newAsset => {
          onChange(newAsset.id);
          setIsOpen(false);
        }}
        title="Select Token"
        open={isOpen}
        assets={allAssets}
      />
    </Fragment>
  );
};

export default AssetSelector;
