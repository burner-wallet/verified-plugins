export default class PluginUserData {
  constructor(plugin, data=[]) {
    this.data = data;

    this.update = async (id, newItem) => {
      PluginUserData.update(id, plugin, newItem);
    };

    this.add = async (newItem) => PluginUserData.add(plugin, newItem);
  }

  get(query) {
    if (query.length) {
      for (const item of this.data) {
        if (item.id === query) {
          return item;
        }
      }
      return null;
    }

    return this.data.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    })
  }

  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next: () => ({
        value: data[++index],
        done: index === data.length,
      }),
    };
  }
}
