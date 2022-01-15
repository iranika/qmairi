interface Config {
    apiKey: string;
    authDomain: string;
    storageBucket: string;
    databaseURL: string;
    projectId: string;
    messagingSenderId: string;
  }
  
  export interface Credentials {
    config: Config;
  }