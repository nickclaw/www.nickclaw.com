import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import './style.scss';

const defaultHead = {
  titleTemplate: 'nickclaw | %s',
  defaultTitle: 'nickclaw',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { charset: 'utf-8' },
    { name: 'keywords', content: '' }
  ],
};

export default props => (
  <main>
    <Helmet {...defaultHead} />
    {props.children}
  </main>
);
