import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../App';

interface Props extends State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [index, setIndex] = useState(0);
  const [curStep, setCurStep] = useState(step);
  const [curFrameSize, setCurFrameSize] = useState(frameSize);
  const [curItemWidth, setCurItemWidth] = useState(itemWidth);

  const maxStart: number = Math.max(0, images.length - curFrameSize);
  const GAP = 10;

  const goTo = (next: number) => {
    if (images.length === 0) {
      return;
    }

    if (infinite) {
      if (next < 0) {
        setIndex(maxStart);

        return;
      }

      if (next > maxStart) {
        setIndex(0);

        return;
      }
    }

    const clamped = Math.min(Math.max(0, next), maxStart);

    setIndex(clamped);
  };

  const isFirst = index === 0 || images.length === 0;
  const isLast = index >= maxStart || images.length === 0;

  return (
    <div className="Carousel">
      <div
        className="Carousel__viewport"
        style={{
          width: curFrameSize * curItemWidth + GAP * (curFrameSize - 1),
          overflow: 'hidden',
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            display: 'flex',
            gap: GAP,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            transform: `translateX(${-index * (curItemWidth + GAP)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, i) => (
            <li key={i} style={{ flex: `0 0 ${curItemWidth}px` }}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                width={curItemWidth}
                height={curItemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="Batton"
        style={{
          width: curFrameSize * curItemWidth,
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <button
          type="button"
          onClick={() => {
            goTo(index - curStep);
          }}
          disabled={isFirst}
          data-cy="prev"
        >
          Prev {curStep}
        </button>
        <button
          type="button"
          onClick={() => {
            goTo(index + curStep);
          }}
          disabled={isLast}
          data-cy="next"
        >
          Next {curStep}
        </button>
      </div>
      <div>
        <input
          type="number"
          value={curItemWidth}
          data-cy="width-input"
          onChange={e => setCurItemWidth(Number(e.target.value))}
        />
        <input
          type="number"
          value={curFrameSize}
          data-cy="frame-input"
          onChange={e => setCurFrameSize(Number(e.target.value))}
        />
        <input
          type="number"
          value={curStep}
          data-cy="step-input"
          onChange={e => setCurStep(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Carousel;
