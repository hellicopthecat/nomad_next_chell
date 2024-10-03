export const dateFormatter = (date: Date) => {
  const dayInMilSec = 1000 * 60 * 60 * 24;
  const dataDate = new Date(date).getTime();
  const nowDate = new Date().getTime();
  const calculate = Math.round((dataDate - nowDate) / dayInMilSec);
  const timeFormat = new Intl.RelativeTimeFormat("ko-KR", {style: "short"});
  return timeFormat.format(calculate, "day");
};
