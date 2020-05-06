import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import plugins from '../../plugin-specs';

const App = () => {
  const [selectedPlugins, setSelectedPlugins] = useState([]);
  const availablePlugins = plugins.filter(plugin => selectedPlugins.indexOf(plugin.id) === -1);

  return (
    <div>
      <h1>Burner Wallet Plugins</h1>
      <List>
        {availablePlugins.map(plugin => (
          <ListItem
            key={plugin.id}
            onClick={() => setSelectedPlugins([...selectedPlugins, plugin.id])}
            button
          >
            <ListItemText primary={plugin.name} secondary={`${plugin.id} - ${plugin.package}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
