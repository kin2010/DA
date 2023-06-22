export const getCourseRating = (comments) => {
  if (!comments?.length) return 0;
  const countByrating =
    comments?.reduce((acc, obj) => {
      return acc + (!!obj?.rating ? parseInt(obj?.rating) : 0);
    }, 0) || 0;
  return !!comments?.length ? countByrating / comments?.length : 0;
};
