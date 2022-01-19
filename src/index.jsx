import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { mainStore, persistor } from './store';
import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <Provider store={mainStore}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

//  If you want to start measuring performance in the app, pass a function
//  to log results (for example: reportWebVitals(console.log))
//  or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
