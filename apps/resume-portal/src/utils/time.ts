const SEC_IN_MILLISECONDS = 1000;
const MIN_IN_MILLISECONDS = SEC_IN_MILLISECONDS * 60;
const HOUR_IN_MILLISECONDS = MIN_IN_MILLISECONDS * 60;
const DAY_IN_MILLISECONDS = HOUR_IN_MILLISECONDS * 24;
const MONTH_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 28;
const YEAR_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 365;

export const toSemester = (date: Date) => {
  const year = date
    .getFullYear()
    .toString()
    .slice(2, 4);

  const month = date.getMonth() > 6 ? "FS" : "SP";

  return month + " " + year;
};

export const timeSince = (date: Date) => {
  const curTime = new Date().getTime();
  const orgTime = date.getTime();
  const delta = Math.floor(curTime - orgTime);
  let interval = Math.floor(delta / YEAR_IN_MILLISECONDS);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(delta / MONTH_IN_MILLISECONDS);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(delta / DAY_IN_MILLISECONDS);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(delta / HOUR_IN_MILLISECONDS);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(delta / MIN_IN_MILLISECONDS);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(delta / SEC_IN_MILLISECONDS) + " seconds";
};
