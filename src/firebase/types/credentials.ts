interface Config {
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  databaseURL: string;
  projectId: string;
  messagingSenderId: string;
  appId: string,
}

export interface Credentials {
  config: Config;
}