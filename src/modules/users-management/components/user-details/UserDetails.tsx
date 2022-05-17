import React from "react";

import { User } from "../../services";

import "./UserDetails.css";

interface UserDetailsProps {
  data: User;
  onClick: () => void;
}

export function UserDetails({ data, onClick }: UserDetailsProps) {
  return (
    <div className="user-details" onClick={onClick}>
      {data && <h1>{data.username}</h1>}
    </div>
  );
}
