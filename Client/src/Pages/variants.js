export const fadeIn = (direction, delay) => {
    return {
      hidden: {
        y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
        x: direction === "left" ? 200 : direction === "right" ? -200 : 0,
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: "tween",
          duration: 1.1,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };
  