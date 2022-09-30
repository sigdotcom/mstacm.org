import React from "react";

import { Button, Result } from "antd";

// interface ISuccessProps {
//   resumeUrl: string;
//   refresh(): void;
// }

// const Success: React.SFC<ISuccessProps> = (
//   resumeUrl,
//   refresh
// }: ISuccessProps): JSX.Element => {
const Success: React.SFC<{}> = (): JSX.Element => {
  return (
    <Result
      status="success"
      title="Successfully uploaded resume"
      extra={
        <Button href="https://mstacm.org" type="primary" key="home">
          Go Home
        </Button>
      }
    />
  );
};

export { Success };
