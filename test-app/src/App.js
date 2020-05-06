import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import plugins from '../../plugin-specs';

const pluginsById = {};
plugins.forEach(plugin => {
  pluginsById[plugin.id] = plugin;
})

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

      <code>
{selectedPlugins.map(pluginId => {
  const plugin = pluginsById[pluginId];
  return `import ${pluginId} from '${plugin.package}';`;
}).join('\n')}
{`

const plugins = [
`}

{selectedPlugins.map(pluginId => {
  // const plugin = pluginsById[pluginId];
  return `  new ${pluginId}();`;
}).join('\n')}
{'\n];'}
      </code>
    </div>
  );
}

export default App;
