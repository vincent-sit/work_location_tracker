function GetDateStringDDMMYY(date) {
  try {
    const dd = date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const mm = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const yy = date.getFullYear();
    return `${dd}-${mm}-${yy}`;
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error ("Incorrect type passed in. Must be a date type.");
    } else {
      throw e;
    }
  }
}

function GetDateStringYYMMDD(date) {  
  try {
    const dd = date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const mm = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const yy = date.getFullYear();
    return `${yy}-${mm}-${dd}`;
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error ("Incorrect type passed in. Must be a date type.");
    } else {
      throw e;
    }
  }
}

export {GetDateStringDDMMYY, GetDateStringYYMMDD};