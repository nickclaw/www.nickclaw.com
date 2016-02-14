import React, { Component } from 'react';
import { Link } from 'react-router';

import { Timeline } from 'components/Timeline';

/* component styles */
import test, { styles } from './styles.scss';
console.log(test);

export class Header extends Component {
  render() {
    return (
      <header className={styles}>
        <Timeline />
        <div className="banner">
          <div className="container">
            <Link to="/about" activeClassName="active">About</Link>
            <Link to="/work" activeClassName="active">Work</Link>
            <Link to="/projects" activeClassName="active">Projects</Link>
            <Link to="/contact" activeClassName="active">Contact</Link>
          </div>
        </div>
      </header>
    );
  }
}
