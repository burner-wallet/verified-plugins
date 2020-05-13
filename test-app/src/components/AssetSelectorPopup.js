import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const AssetSelectorPopup = ({ onClose, onSelect, title, assets, open }) => {
  const [pending, setPending] = useState(false);

  const selectAsset = async (asset) => {
    setPending(true);
    try {
      await onSelect(asset);
    } catch (e) {
      console.error(e);
    }
    setPending(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <div>
        <List>
          {assets.map(asset => (
            <ListItem
              button
              onClick={() => selectAsset(asset)}
              key={asset.id}
              disabled={pending}
            >
              <ListItemAvatar>
                <Avatar>
                  <img src={asset.icon} alt={asset.name} style={{ width: '100%' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={asset.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
};

export default AssetSelectorPopup;
