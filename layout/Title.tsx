import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface IPropsTitle {
  title: string;
  id?: string;
  cssClass?: string;
  animationType?: string;
}
const Title = (props: IPropsTitle) => {
  const { title, cssClass, id } = props;
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });
  const [animation, setAnimation] = useState<AnimeTimelineInstance>();

  useEffect(() => {
    setAnimation(
      anime
        .timeline({
          autoplay: false,
          loop: 1,
          complete: function (anim) {
            console.log('complete :>> ');
          },
        })
        .add({
          targets: ref,
          scale: [2, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: 'easeOutExpo',
          duration: 550,
          delay: (el, i) => 50 * i,
        })
    );
  }, []);

  return (
    <h1
      className={`title-animated ${cssClass} ${inView ? 'animated' : ''}`}
      id={id}
      ref={ref}
    >
      {title &&
        title.split(' ').map((letter, index) => (
          <React.Fragment key={index}>
            <span className="letter">{letter}</span>{' '}
          </React.Fragment>
        ))}
    </h1>
  );
};

export default Title;
