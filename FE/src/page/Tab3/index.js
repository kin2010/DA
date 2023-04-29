import * as React from "react";
import VirtualList from "rc-virtual-list";
import { Avatar, Checkbox, List } from "antd";
export default function Tab3({ teacher, ids }) {
  console.log(33, teacher, ids);
  const [checked, setChecked] = React.useState([1]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <div>Teacher :</div>
      {!!teacher?.length && (
        <List>
          <VirtualList
            unselectable="off"
            data={teacher.filter((t) => ids.includes(t?._id))}
            height={400}
            itemHeight={47}
            itemKey="email"
          >
            {(item) => (
              <>
                <List.Item key={item?.email}>
                  <List.Item.Meta
                    avatar={<Avatar src={item?.picture?.large} />}
                    title={<a href="https://ant.design">{item?.fullName}</a>}
                    description={item?.email}
                  />
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(item?._id)}
                    checked={checked.indexOf(item?._id) !== -1}
                    //   inputProps={ "aria-labelledby" }
                  />
                </List.Item>
              </>
            )}
          </VirtualList>
        </List>
      )}
      <div>Student :</div>
      {/* 
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> */}
    </>
  );
}
