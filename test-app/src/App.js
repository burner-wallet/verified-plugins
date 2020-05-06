import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
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
      <div className={classes.cols}>
        <List className={classes.pluginList}>
          {availablePlugins.map(plugin => (
            <ListItem
              key={plugin.id}
              onClick={() => setSelectedPlugins([...selectedPlugins, plugin.id])}
              button
              divider
            >
              <ListItemText primary={plugin.name} secondary={`${plugin.id} - ${plugin.package}`} />
            </ListItem>
          ))}
        </List>
        <List>
          {selectedPlugins.map(pluginId => {
            const plugin = pluginsById[pluginId];
            return (
              <ListItem key={plugin.id} divider>
                <div>
                  <ListItemText primary={plugin.name} />
                  {/*plugin.editors && plugin.editors.map(editor => (
                    <Button
                      key={editor.label}
                      onClick={() => setPluginEditor({ wallet, pluginData: wallet.plugins[id], ...editor })}
                    >
                      {editor.label}
                    </Button>
                  ))*/}
                </div>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => setSelectedPlugins(selectedPlugins.filter(_plugin => _plugin !== pluginId))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>

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
