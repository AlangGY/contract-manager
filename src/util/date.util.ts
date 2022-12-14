export const dayDiff = (date1: Date, date2: Date) => {
  const timeDiff = Math.floor(
    (date1.getTime() - date2.getTime()) / 1000 / 3600 / 24
  );
  if (timeDiff === -1) return 0;
  return timeDiff;
};
