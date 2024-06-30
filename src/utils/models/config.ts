export class ConfigList {
  config: Config[] = [];
  constructor() {}
  getValueByName(name: string) {
    const config = this.config.find((cf) => cf.name === name);
    return config;
  }

  addConfig(item: Config) {
    this.config.push(item);
  }
}

export class Config implements IConfigList {
  name: string;
  value: string;
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
