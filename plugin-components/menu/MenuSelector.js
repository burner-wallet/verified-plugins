import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
// import { PluginData } from '/client/collections';
import { makeStyles } from '@material-ui/core/styles';
import Vendors from './Vendors';

const useStyles = makeStyles({
  container: {
    margin: 8,
  },
});

const MenuSelector = ({ pluginWalletData, pluginUserData, components }) => {
  const [selection, setSelection] = useState(pluginWalletData.menuId || 'none');
  const [menuName, setMenuName] = useState('');
  const [pending, setPending] = useState(false);
  const classes = useStyles();

  const changeSelection = (e) => {
    const newSelection = e.target.value;
    setSelection(newSelection);
    if (newSelection === 'new') {
      return;
    }

    pluginWalletData.update({ menuId: newSelection });
  };

  const create = async () => {
    setPending(true);
    const id = await pluginUserData.add({ name: menuName, vendors: [], type: 'menu' });
    await pluginWalletData.update({ menuId: id });
    setSelection(id);
    setPending(false);
  };

  const menus = pluginUserData.get({ type: 'menu' });

  return (
    <div className={classes.container}>
      <div>
        <Select value={selection} onChange={changeSelection}>
          <MenuItem value="none">Select a menu</MenuItem>
          <Divider />
          {menus.map(menu => (
            <MenuItem value={menu.id} key={menu.id}>{menu.name}</MenuItem>
          ))}
          <Divider />
          <MenuItem value="new">Create new menu</MenuItem>
        </Select>
      </div>

      {selection === 'new' && (
        <div>
          <TextField
            value={menuName}
            onChange={e => setMenuName(e.target.value)}
            disabled={pending}
          />
          <Button onClick={create} disabled={pending || menuName.length < 2}>Create</Button>
        </div>
      )}

      {selection !== 'none' && selection !== 'new' && (
        <Vendors
          pluginWalletData={pluginWalletData}
          pluginUserData={pluginUserData}
          menuId={selection}
          components={components}
        />
      )}
    </div>
  );
};

export default MenuSelector;
