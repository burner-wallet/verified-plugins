import React from 'react';
import plugins from '../../plugin-specs';

function App() {
  return (
    <div>
      <h1>Burner Wallet Plugins</h1>
      {plugins.map(plugin => (
        <div>{plugin.name}</div>
      ))}
    </div>
  );
}

export default App;
