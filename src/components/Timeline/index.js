import React, { Component } from 'react';
import { connect } from 'react-redux';

import { styles } from './styles.scss';

@connect(state => state)
export class Timeline extends Component {

  render() {

    return (
      <div className={styles}>

      </div>
    )
  }
}
