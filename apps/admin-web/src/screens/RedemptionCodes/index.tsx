import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { Form, Select, Button } from "antd";

import {
  useCreateCodeMutation,
  useGetGroupsQuery,
  useGetProductsQuery,
  useGetPermissionsQuery,
} from "../../generated/graphql";

const Box: AnyStyledComponent = styled.div`
  height: auto;
  width: auto;
  padding: 10px;
  background-color: white;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  font-size: 20px;
  padding-top: 10px;

  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-family: sans-serif;
  padding-bottom: 5px;
`;
const RedemPadding: AnyStyledComponent = styled.div`
  padding: 50px 40px 20px;
`;
const { Option } = Select;

const RedemptionCodes: React.FC<{}> = () => {
  const { data: gd } = useGetGroupsQuery();
  const { data: ped } = useGetPermissionsQuery();
  const { data: prd } = useGetProductsQuery();
  const [createCode, { loading, error, data }] = useCreateCodeMutation();

  const onFinish = (values: any) => {
    createCode({
      variables: {
        permissions: values.permissions,
        groups: values.groups,
        products: values.product ? [values.product] : null, // currently we only support one product but could be more in the future
      },
    });
  };
  return (
    <>
      <RedemPadding>
        <Form name="redemption-codes" onFinish={onFinish}>
          <Box>
            <Form.Item name="groups" label="Permission Groups">
              <Select
                mode="multiple"
                placeholder="Please select permission groups to apply"
              >
                {gd?.groups.map(({ name: group }: { name: string }) => (
                  <Option value={group}>{group}</Option>
                ))}
              </Select>
            </Form.Item>
          </Box>
          <Box>
            <Form.Item name="permissions" label="Permissions">
              <Select
                mode="multiple"
                placeholder="Please select permissions to apply"
              >
                {ped?.permissions.map(
                  ({ name: permission }: { name: string }) => (
                    <Option value={permission}>{permission}</Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Box>
          <Box>
            <Form.Item name="product" label="Product">
              <Select placeholder="Please select a product">
                {prd?.products.map(
                  ({
                    displayName: product,
                    tag,
                  }: {
                    displayName: string;
                    tag: string;
                  }) => (
                    <Option value={tag}>{product}</Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Box>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </RedemPadding>
      {(loading && "Loading") || // If loading
      (error && error.toString()) || // If error
        (data && ( // If success
          <>
            <h3>Redemtion Code Created:</h3>
            <p>{`https://mstacm.org/?redeem=${data.createRedemptionCode.id}`}</p>
          </>
        ))}
    </>
  );
};

export { RedemptionCodes };
