import React, { useState } from 'react';
import './Carousel.scss';
interface Props {
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

  const maxStart: number = Math.max(0, images.length - frameSize);
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
          width: frameSize * itemWidth + GAP * (frameSize - 1),
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
            transform: `translateX(${-index * (itemWidth + GAP)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((src, i) => (
            <li key={i} style={{ flex: `0 0 ${itemWidth}px` }}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                width={itemWidth}
                height={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="Batton"
        style={{
          width: frameSize * itemWidth,
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 8,
        }}
      >
        <button
          type="button"
          onClick={() => {
            goTo(index - step);
          }}
          disabled={isFirst}
          data-cy="prev"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => {
            goTo(index + step);
          }}
          disabled={isLast}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
