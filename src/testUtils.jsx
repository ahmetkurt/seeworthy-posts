import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { mainStore } from './store';

const render = (
  ui,
  { preloadedState, store = mainStore, ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  Wrapper.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
