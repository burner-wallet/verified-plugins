import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import editors from '../../plugin-editors';
import plugins from '../../plugin-specs';
import ErrorBoundary from './ErrorBoundary';
import PluginUserData from './PluginUserData';
import PluginWalletData from './PluginWalletData';
import { useDB } from './DB';

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
  const [pluginEditor, setPluginEditor] = useState(null);
  const { pluginWalletDataDB, pluginUserDataDB } = useDB();

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
                  {editors[pluginId] && editors[pluginId].map(editor => (
                    <Button
                      key={editor.label}
                      onClick={() => setPluginEditor({ component: editor.component, plugin: plugin.id })}
                    >
                      {editor.label}
                    </Button>
                  ))}
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

      <div style={{ display: 'flex' }}>
        <code style={{flex: '1'}}>
          {'Wallet plugin data:\n\n'}
          {JSON.stringify(pluginWalletDataDB, null, 2)}
        </code>
        <code style={{flex: '1'}}>
          {'User plugin data:\n\n'}
          {JSON.stringify(pluginUserDataDB, null, 2)}
        </code>
      </div>

      <code>
{selectedPlugins.map(pluginId => {
  const plugin = pluginsById[pluginId];
  return `import ${pluginId} from '${plugin.package}';`;
}).join('\n')}
{`

const plugins = [
`}

{selectedPlugins.filter(pluginId => {
  const plugin = pluginsById[pluginId];
  if (plugin.getIncomplete) {
    return !plugin.getIncomplete({
      pluginWalletData: pluginWalletDataDB[pluginId] || {},
      pluginUserData: pluginUserDataDB[pluginId] || {},
    });
  }
  return true;
}).map(pluginId => {
  const plugin = pluginsById[pluginId];
  const args = generatePluginArgs(plugin, pluginWalletDataDB[pluginId], pluginUserDataDB[pluginId]);
  return `  new ${pluginId}(${args}),`;
}).join('\n')}
{'\n];'}
      </code>

      <Dialog open={!!pluginEditor} onClose={() => setPluginEditor(null)}>
        <ErrorBoundary>
          {pluginEditor ? (
            <pluginEditor.component
              plugin={pluginsById[pluginEditor.plugin]}
              pluginWalletData={pluginWalletDataDB[pluginEditor.plugin] || new PluginWalletData('walletId', pluginEditor.plugin, {})}
              pluginUserData={pluginUserDataDB[pluginEditor.plugin] || new PluginUserData(pluginEditor.plugin, [])}
            />
          ) : <Fragment />}
        </ErrorBoundary>
      </Dialog>
    </div>
  );
}

export default App;
