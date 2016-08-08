import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import './style.scss';

@connect()
export default class Home extends React.Component {
  render() {
    const style = {
      backgroundImage: 'url(/waves.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: '43% 10%',
    };

    return (
      <section className="home" style={style}>

      </section>
    );
  }
}
