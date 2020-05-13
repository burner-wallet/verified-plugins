import { useState, useEffect } from 'react';
import PluginUserData from './PluginUserData';
import PluginWalletData from './PluginWalletData';

export const useDB = () => {
  const [pluginWalletDataDB, setPluginWalletDataDB] = useState({});
  const [pluginUserDataDB, setPluginUserDataDB] = useState({});

  useEffect(() => {
    PluginWalletData.update = (wallet, plugin, data) => {
      setPluginWalletDataDB({ ...pluginWalletDataDB, [plugin]: new PluginWalletData(wallet, plugin, data )});
    };

    PluginUserData.update = (id, plugin, newItem) => {
      const newData = [...pluginUserDataDB[plugin].data];
      newData[parseInt(id)] = newItem;
      setPluginUserDataDB({
        ...pluginUserDataDB,
        [plugin]: new PluginUserData(plugin, newData),
      });
    }

    PluginUserData.add = (plugin, newItem) => {
      if (!pluginUserDataDB[plugin]) {
        setPluginUserDataDB({ ...pluginUserDataDB, [plugin]: new PluginUserData(plugin, [{ ...newItem, id: '0' }]) });
        return '0';
      } else {
        const id = pluginUserDataDB[plugin].data.length.toString();
        const newData = [...pluginUserDataDB[plugin].data, { ...newItem, id }]
        setPluginUserDataDB({ ...pluginUserDataDB, [plugin]: new PluginUserData(plugin, newData) });
        return id;
      }
    };
  }, [pluginWalletDataDB, pluginUserDataDB]);

  return { pluginWalletDataDB, pluginUserDataDB };
};
