import React, { useEffect, useState } from "react";
import User from "../../../component/User";
import "./index.css";
import SearchAuto from "../../../component/Autocomplete";

const Member = (props) => {
  const { member } = props;
  const [users, setUsers] = useState(member);

  useEffect(() => {
    setUsers(member);
  }, [member]);
  return (
    <div className="member-pannel">
      <h4>Mọi người :</h4>
      <div className="mt-4 mb-5">
        <SearchAuto setValue={setUsers} originValue={member}></SearchAuto>
      </div>
      {users?.map((user) => (
        <User key={user?._id} user={user} />
      ))}
    </div>
  );
};

export default Member;
