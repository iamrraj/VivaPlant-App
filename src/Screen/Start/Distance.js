function toRad(angle) {
  return (angle * Math.PI) / 180;
}

export const disatanceFormule = (firstTime, lastSecond) =>
  firstTime && lastSecond // In kilometers
    ? 6377.830272 *
      Math.acos(
        Math.sin(toRad(firstTime['latitude'])) *
          Math.sin(toRad(lastSecond['latitude'])) +
          Math.cos(toRad(firstTime['latitude'])) *
            Math.cos(toRad(lastSecond['latitude'])) *
            Math.cos(
              toRad(lastSecond['longitude']) - toRad(firstTime['longitude']),
            ),
      )
    : '0.000';
