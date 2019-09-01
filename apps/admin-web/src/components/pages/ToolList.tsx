import React from "react";
import { Link } from "react-router-dom";

const ToolList: React.SFC<{}> = (): JSX.Element => {
  return (
    <div>
      <h2>Tools:</h2>
      <ul>
        <li>
          <Link to="/membership">Membership</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/sigs">SIGs</Link>
        </li>
        <li>
          <Link to="/sponsors">Sponsors</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export { ToolList };
