import { format } from "date-fns";

// use Chinese Simplified locale in a specific instance
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
