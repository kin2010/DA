export const capitalizeFullName = (name) => {
  if (!name) return "";
  return name
    ?.split(" ")
    .map((str) => str?.charAt(0).toUpperCase() + str?.slice(1))
    .join(" ");
};

export const DefaultAvatar = (props) => {
  const { name, width } = props;
  return (
    <span
      style={{
        width: !!width ? `${width}px` : "32px",
        height: !!width ? `${width}px` : "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        background: "#757575",
        borderRadius: "100em",
      }}
    >
      {name?.charAt(0).toUpperCase()}
    </span>
  );
};
