// useEffect(() => {
//   getLocation();
// }, []);
// const getLocation = async () => {
//   const hasPermission = await hasLocationPermission();

//   if (!hasPermission) {
//     return;
//   }
//   setloading(true);
//   Geolocation.getCurrentPosition(
//     position => {
//       setLocation(position);

//       setloading(false);
//     },
//     error => {
//       Alert.alert(`Code ${error.code}`, error.message);
//       setLocation(null);
//       console.log(error);
//     },
//     {
//       accuracy: {
//         android: 'high',
//         ios: 'best',
//       },
//       enableHighAccuracy: highAccuracy,
//       timeout: 15000,
//       maximumAge: 10000,
//       distanceFilter: 0,
//       forceRequestLocation: forceLocation,
//       showLocationDialog: locationDialog,
//     },
//   );
// };

useEffect(() => {
  let intervalId;

  if (isActive) {
    intervalId = setInterval(() => {
      const secondCounter = counter % 60;
      const minuteCounter = Math.floor(counter / 60);
      const minuteHour = Math.floor(counter / 60 / 60);
      let computedSHour =
        String(minuteHour).length === 1 ? `0${minuteHour}` : minuteHour;
      let computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
      let computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;

      setSecond(computedSecond);
      setMinute(computedMinute);
      setHour(computedSHour);
      const timeUp = `${minuteHour}:${computedMinute}:${computedSecond}`;
      totalTime(timeUp);
      setStart('stop');

      setCounter(counter => counter + 1);
    }, 1000);
  }

  return () => clearInterval(intervalId);
}, [isActive, counter]);

function stopTimer() {
  setIsActive(false);
  setStart('stoptrip');
  setCounter(0);
  setSecond('00');
  setMinute('00');
  setHour('00');
  // sendData();
}
