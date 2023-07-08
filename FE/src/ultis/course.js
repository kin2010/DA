export const getCourseRating = (comments) => {
  if (!comments?.length) return 0;
  const countByrating =
    comments?.reduce((acc, obj) => {
      return acc + (!!obj?.rating ? parseInt(obj?.rating) : 0);
    }, 0) || 0;
  return !!comments?.length ? countByrating / comments?.length : 0;
};

export const getDiscount = (course) => {
  const discount = course?.discount || 0;
  const price = course?.price || 0;
  return ((price - discount)?.toLocaleString("en-US") || 0) + " ₫";
};

export const getPrice = (course) => {
  const price = course?.price || 0;
  return (price?.toLocaleString("en-US") || 0) + " ₫";
};
