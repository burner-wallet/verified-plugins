import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import plugins from '../../plugin-specs';

const pluginsById = {};
plugins.forEach(plugin => {
  pluginsById[plugin.id] = plugin;
});

const generatePluginArgs = (plugin, pluginWalletData, pluginUserData) => {
  if (!plugin.getArgs) {
    return '';
  }

  let args = plugin.getArgs({ pluginWalletData, pluginUserData });

  if (!Array.isArray(args)) {
    args = [args];
  }

  args = args.map((arg: any) => JSON.stringify(arg));

  return args.join(',');
}


const useStyles = makeStyles({
  pluginList: {
    overflow: 'auto',
    maxHeight: '50vh',
    background: '#ececec',
  },
});

const App = () => {
  const classes = useStyles();
  const [selectedPlugins, setSelectedPlugins] = useState([]);
  const availablePlugins = plugins.filter(plugin => selectedPlugins.indexOf(plugin.id) === -1);

  return (
    <div>
      <h1>Burner Wallet Plugins</h1>
      <List className={classes.pluginList}>
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
  const plugin = pluginsById[pluginId];
  const args = generatePluginArgs(plugin, {}, []);
  return `  new ${pluginId}(${args}),`;
}).join('\n')}
{'\n];'}
      </code>
    </div>
  );
}

export default App;
