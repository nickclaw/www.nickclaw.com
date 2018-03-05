import React from 'react';
import Helmet from 'react-helmet';

import './style.scss';

export default class Home extends React.Component {
  render() {
    return (
      <section className="home">
        <div className="home__fog" />
        <h1>
          <a href="#">nickclaw</a>
        </h1>

        <div className="home__links">
          <a href="#about">
            about
          </a>
          /
          <a href="#work">
            work
          </a>
          /
          <a href="/resume.pdf" download={true}>
            resume
          </a>
          /
          <a href="https://github.com/nickclaw">
            github
          </a>
        </div>
      </section>
    );
  }
}
