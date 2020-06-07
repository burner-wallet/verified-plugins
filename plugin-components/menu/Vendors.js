import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import MenuEditor from './MenuEditor';

const Vendors = ({ pluginWalletData, pluginUserData, menuId, asset, components }) => {
  const menu = pluginUserData.get(menuId);

  const [tab, setTab] = useState(0);
  const [newName, setNewName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const vendor = tab === 0 ? null : menu.vendors[tab - 1];

  const addVendor = async () => {
    const newVendor = {
      name: newName,
      recipient: '',
      workers: [],
      items: [],
      isOpen: true,
    };
    await pluginUserData.update(menuId, { ...menu, vendors: [...menu.vendors, newVendor] });
    setNewName('');
    setTab(menu.vendors.length + 1);
  };

  const setVendorProp = async (vendor, prop, val) => {
    await pluginUserData.update(menuId, {
      ...menu,
      vendors: menu.vendors.map(_vendor => _vendor === vendor ? { ...vendor, [prop]: val } : _vendor),
    });
  };

  return (
    <div>
      <components.AssetSelector
        asset={menu.asset}
        onChange={asset => pluginUserData.update(menuId, { ...menu, asset })}
      />

      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="New Vendor" />
          {menu.vendors.map(vendor => (
            <Tab label={vendor.name} key={vendor.name} />
          ))}
        </Tabs>
      </AppBar>
      {vendor ? (
        <div>
          <TextField
            fullWidth
            value={vendor.name}
            label="Vendor Name"
            onChange={e => setVendorProp(vendor, 'name', e.target.value)}
          />
          <TextField
            fullWidth
            label="Vendor recipient address"
            value={vendor.recipient}
            onChange={e => setVendorProp(vendor, 'recipient', e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={vendor.isOpen} onChange={e => setVendorProp(vendor, 'isOpen', e.target.checked)} />}
            label="Is open"
          />
          <MenuEditor menu={vendor.items} onChange={items => setVendorProp(vendor, 'items', items)} />
        </div>
      ) : (
        <div>
          <TextField value={newName} onChange={e => setNewName(e.target.value)} />
          <Button onClick={addVendor}>Create Vendor</Button>
        </div>
      )}
    </div>
  );
};

export default Vendors;
