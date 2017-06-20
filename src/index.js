import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store, {handlePageLoad} from './model';
import App from './App';
import './index.css';
import tableOfContents from "./data/pages.json";

function Root() {
  handlePageLoad();
  return (
    <Provider store={store}>
        <App tableOfContents={tableOfContents} />
    </Provider>
  );
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
