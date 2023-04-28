export const generateOTP = (): number => {
  return Math.floor(Math.random() * 100000);
};
