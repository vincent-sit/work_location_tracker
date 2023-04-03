function GetDateString(date) {
  const dd = date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  const mm = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  const yy = date.getFullYear();
  return `${dd}-${mm}-${yy}`;
}

export {GetDateString};