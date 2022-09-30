import React from "react";

import { Form, Select, Button } from "antd";

import {
  useCreateCodeMutation,
  useGetGroupsQuery,
  useGetProductsQuery,
  useGetPermissionsQuery,
} from "../../generated/graphql";

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
      <Form name="redemption-codes" onFinish={onFinish}>
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
        <Form.Item name="permissions" label="Permissions">
          <Select
            mode="multiple"
            placeholder="Please select permissions to apply"
          >
            {ped?.permissions.map(({ name: permission }: { name: string }) => (
              <Option value={permission}>{permission}</Option>
            ))}
          </Select>
        </Form.Item>

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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
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
