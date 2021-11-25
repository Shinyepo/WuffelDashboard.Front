import React, { FC } from "react";

interface Props {
  data: any;
}

export const Chart: FC<Props> = ({ data }) => {
  return (
    <>
      {/* <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="id" stroke="#ccc" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
      </LineChart> */}
    </>
  );
};
