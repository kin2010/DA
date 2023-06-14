import { format } from "date-fns";

// use Chinese Simplified locale in a specific instance
export const REGEXS = {
  YOUTUBE:
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  TWITTER:
    /^https?:\/\/(mobile\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\?.*?)?$/,
  YOUTUBE_SHORT:
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/,
};
export const formatDate = (day) => {
  if (!day) {
    return;
  }
  return "".concat(day.substring(0, 10), " ", day.substring(11, 19));
};
export const formatNumber = (data) => {
  return new Intl.NumberFormat().format(data);
};

export const dateFormat = (date, symbol = "yyyy-mm-dd hh:mm") => {
  return format(new Date(date), symbol);
};

export const getYoutubeId = (link) => {
  const result = link?.match(REGEXS.YOUTUBE);
  const resultShortYoutube = link?.match(REGEXS.YOUTUBE_SHORT);
  if (result && result[1]) {
    return result[1];
  } else if (resultShortYoutube && resultShortYoutube[3]) {
    return resultShortYoutube[3];
  }
  return "";
};
