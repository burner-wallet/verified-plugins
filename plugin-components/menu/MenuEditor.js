import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DragHandle from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DragAndDrop from '../components/DragAndDrop';

const useStyles = makeStyles({
  nameField: {
    flex: '1',
    marginRight: 4,
  },
  priceField: {
    maxWidth: 100,
  },
});

const ItemComponent = ({ item, items, onChange }) => {
  const [price, setPrice] = useState(null);
  const [name, setName] = useState(null);
  const classes = useStyles();

  const updateItem = (prop, val) => onChange(items.map(_item => _item === item ? {
    ...item,
    [prop]: val,
  } : _item));

  return (
    <Fragment>
      <TextField
        label="Item name"
        value={name || item.name}
        className={classes.nameField}
        onChange={e => setName(e.target.value)}
        onBlur={async () => {
          if (name && name !== item.name) {
            await updateItem('name', name);
            setPrice(null);
          }
        }}
      />
      <TextField
        label="Price"
        type="number"
        inputProps={{ min: '0' }}
        value={price || item.price}
        className={classes.priceField}
        onChange={e => setPrice(e.target.value)}
        onBlur={async () => {
          if (price && price !== item.price) {
            await updateItem('price', price);
            setPrice(null);
          }
        }}
      />
      <Tooltip title="Available/In Stock">
        <Checkbox
          checked={item.available === false ? false : true}
          onChange={e => updateItem('available', e.target.checked)}
        />
      </Tooltip>
    </Fragment>
  );
};

const MenuEditor = ({ menu, onChange }) => {
  return (
    <DragAndDrop ItemComponent={ItemComponent} items={menu} onChange={onChange} deleteButton>
      <Button onClick={() => onChange([...menu, { name: '', 'price': '0', available: true }])}>New Item</Button>
    </DragAndDrop>
  );
};

export default MenuEditor;
