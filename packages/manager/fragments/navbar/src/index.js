/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import registerFragment from '@ovh-ux/ufrontend/fragment';
import { Navbar } from './navbar.jsx';

registerFragment('navbar').then(({ parent, config }) => {
  ReactDOM.render(
    <Navbar user={config.user} />,
    parent,
  );
});
/* eslint-enable */
