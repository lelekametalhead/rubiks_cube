import React from 'react';
import {createRoot} from 'react-dom/client';
import store from "./store/store";
import { Provider } from 'react-redux'
import App from "./components/App";
import './styles/reset.css'
import './styles/fonts.css'
import './styles/globals.css'
import './styles/main.css'

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)