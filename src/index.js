import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import RootStore from './stores';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootStoreClient = new RootStore();

const entity =
  <MobxProvider {...rootStoreClient}>
    <App/>
  </MobxProvider>;

ReactDOM.render(entity, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
