/**
 * The function to get date time from timestamp
 * @param {number} timestamp
 * @returns {string}
 */
export const displayTime = (timestamp: number): string => {
  const formattedTime = new Date(timestamp).toLocaleDateString("en-US");

  return formattedTime;
};

/**
 * The function to get preview body text
 * @param {string} body
 * @returns {string}
 */
export const previewBody = (body: string) => {
  let previewText = "";
  const length = body.length;
  if (length > 15) {
    let before = "";
    let after = "";
    for (let i = 0; i < length; i++) {
      if (i < 10) {
        before += body[i];
      } else if (i > length - 5) {
        after += body[i];
      }
    }

    if (before !== "") {
      previewText = before + "...." + after;
    }
  } else {
    previewText = body;
  }

  return previewText;
};
