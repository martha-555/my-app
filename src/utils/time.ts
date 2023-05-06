/** @format */

const SEC_IN_DAY = 86400;

export const formatSeconds = (seconds: number): string => {
  if (seconds >= SEC_IN_DAY) return "more than one day";

  const date = new Date(seconds * 1000);
  const s = date.getSeconds();
  const formatedSeconds = s < 10 ? "0" + s : s;
  const m = date.getMinutes();
  return `${m}:${formatedSeconds}`;
};
