import React from 'react';
import raf from 'raf';
import _ from 'lodash';

import './style.scss';

export default class About extends React.Component {

  _frame = null;

  componentDidMount() {
    const tick = () => {
      const height = window.innerHeight;
      const container = document.getElementById('about');
      const jelly = document.getElementById('jelly');
      const bounds = container.getBoundingClientRect();
      const cur = bounds.top;
      const bot = height;
      const top = -bounds.height;
      const per = (cur - bot) / (top - bot);
      const y = -10 + 20 * per;
      const x = 10 - 20 * per;
      const [ox, oy] = jelly.style.transform.match(/([\d\.]+)px/g).map(v => parseFloat(0, 10));
      const nx = _.mean([x, ox]);
      const ny = _.mean([y, oy]);

      jelly.style.transform = `translate(${nx}px, ${ny}px)`;

      this._frame = raf(tick);
    };

    tick();
  }

  componentWillUnmount() {
    raf.cancel(this._frame);
  }

  render() {
    return (
      <section className="about" id="about">
        <div
          id="jelly"
          style={{
            top: '5%',
            left: '60%',
            position: 'absolute',
            transform: 'translate(0px, 0px)',
          }}
        />
        <h2>
          <a href="#about">about</a>
        </h2>
        <p>
          I've always been interested in the line where creativity and technology meet.
          Growing up in Bellingham, Washington, I spent an inordinate amount of time building skills in
          architecture, visual effects, 3d modeling, and animation. It wasn't until I had taken my first
          computer science course at the University of Washington that I knew I had found what I was looking for.
        </p>

        <p>
          I'm currently living in Seattle Washington and working for Azuqua as a software engineer.
          Check out <a href="https://github.com/nickclaw">Github</a> to see what I'm working on.
        </p>
      </section>
    );
  }
}
