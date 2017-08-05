import React from 'react';

import './style.scss';

export default class Work extends React.Component {
  render() {
    return (
      <section className="work" id="work">
        <div className="work__twinkle" />
        <h2>
          <a href="#work">work</a>
        </h2>

        <div className="work-item">
          <div className="work-item__header">
            <h3>Azuqua</h3>
            <label>
              2015 -
            </label>
          </div>

          <p>
            Currently working as a software engineer at Azuqua, expanding and improving our awesome single page app.
            Doing everything from designing and creating brand new features to identifying and fixing security
            issues across our many microservices. Played a major role in the complete rewrite of our platform.
          </p>

          <div className="work-item__tags">
            <a>nodejs</a>
            <a>react</a>
            <a>redux</a>
            <a>webpack</a>
          </div>
        </div>

        <div className="work-item">
          <div className="work-item__header">
            <h3>Disney</h3>
            <label>
              2014
            </label>
          </div>

          <p>
            Interned for 6 months on an internal development team at Disney. Redesigned and reimplemented
            the homepage widget toolset to be extendable and customizable for a variety of scenarios.
            Worked on rebuilding core the of the content management system used by Disney owned companies like
            ESPN and ABC.
          </p>

          <div className="work-item__tags">
            <a>javascript</a>
            <a>html</a>
            <a>websockets</a>
            <a>d3</a>
          </div>
        </div>

        <div className="work-item">
          <div className="work-item__header">
            <h3>UW</h3>
            <label>
              2013 - 2015
            </label>
          </div>

          <p>
            Created and maintained a content management system used by the Department of Biology
            at the University of Washington. Enabled professors to customize and create content
            for their course websites. Used by daily by dozens of classes and thousands of students.
          </p>

          <div className="work-item__tags">
            <a>php</a>
            <a>symphony</a>
            <a>sql</a>
            <a>nodejs</a>
            <a>angular</a>
          </div>
        </div>
      </section>
    );
  }
}
