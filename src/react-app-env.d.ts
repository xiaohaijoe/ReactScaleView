/// <reference types="react-scripts" />

declare module '*.less';

declare module '*.css';

declare module '*.json';

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  Config: any;
  AMap: any;
}

declare const $api: {
  [key: string]: any;
};
