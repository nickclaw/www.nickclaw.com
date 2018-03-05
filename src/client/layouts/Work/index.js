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
            <h3>Facebook</h3>
            <label>
              2018 -
            </label>
          </div>

          <p>
            Currently working at Facebook as a front end engineer.
          </p>

          <div className="work-item__tags">
            <a>todo</a>
          </div>
        </div>

        <div className="work-item">
          <div className="work-item__header">
            <h3>Azuqua</h3>
            <label>
              2015 - 2018
            </label>
          </div>

          <p>
            Worked full time as a software engineer for Azuqua, playing a major role in the rewrite and continuous development of the platform. Worked primarily on the main single page app, but also participated in the the design and implementation of brand new features across microservices. Used security scanning tools to identify issues and coordinate solutions.
          </p>

          <div className="work-item__tags">
            <a>nodejs</a>
            <a>react</a>
            <a>redux</a>
            <a>webpack</a>
            <a>redis</a>
            <a>burp suite</a>
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
            Interned for 6 months on an internal development team. Designed and implemented a framework for interactive "widgets" that made data visualization and management easier. Worked on rebuilding the core UI of the content management system used by Disney owned companies like ESPN and ABC.
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
            Created and maintained a content management system that enabled professors to customize and create content for their course websites. Used daily by dozens of classes and thousands of students during it's lifespan.
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
