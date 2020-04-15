import React from "react";
import { Link } from "react-router-dom";

const ToolList: React.SFC<{}> = (): JSX.Element => {
  return (
    <div>
      <h2>Tools:</h2>
      <ul>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/membership">Membership</Link>
        </li>
      </ul>
    </div>
  );
};

export { ToolList };
