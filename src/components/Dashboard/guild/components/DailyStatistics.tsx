import { Box, Flex, Heading, HStack } from "@chakra-ui/layout";
import { FC, useEffect } from "react";
import { useParams } from "react-router";
import {
  GuildTraffic,
  useGuildTrafficQuery,
} from "../../../../generated/graphql";
import { FetchingData } from "../../FetchingData";
import { UserJoins } from "./UserJoins";
import groupArray from "group-array";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface Props {
  count: string | undefined;
}

function chartData(data: GuildTraffic[]) {
  let joinedSeries = [];
  let leftSeries = [];
  let serialized = [] as GuildTraffic[];

  for (const item of data) {
    item.createdAt = new Date(parseInt(item.createdAt))
      .setHours(12, 0, 0, 0)
      .toString();
    serialized.push(item);
  }

  const grouped = groupArray(serialized, "createdAt");

  for (const [key, value] of Object.entries(grouped)) {
    const data = value as GuildTraffic[];
    const count = data.filter((x) => x.joined).length;

    const entry = [parseInt(key), count];
    joinedSeries.push(entry);

    leftSeries.push({
      x: key,
      y: data.length - count,
    });
  }

  return {
    joinedSeries,
    leftSeries,
  };
}

export const DailyStatistics: FC<Props> = ({ count }) => {
  const { id }: { id: string } = useParams();

  const [{ data, fetching }] = useGuildTrafficQuery({ variables: { gid: id } });

  let body = <FetchingData />;

  if (!fetching && data?.guildTraffic) {
    const traffic = data.guildTraffic;
    const { joinedSeries, leftSeries } = chartData(data.guildTraffic);
    const now = new Date().setHours(0, 0, 0, 0);

    const d = new Date();
    d.setDate(d.getDate() - 8);

    const fakeDate = [
      [1637535600000, 161],
      [1637622000000, 30],
    ];

    const fakeOptions: ApexOptions = {
      series: [
        {
          data: joinedSeries as any,
        },
      ],
      chart: {
        id: "area-datetime",
        type: "area",
        height: 350,
        foreColor: "white",
        zoom: {
          autoScaleYaxis: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        min: 0,
      },
      xaxis: {
        type: "datetime",
        min: d.getTime(),
        max: Date.now(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",

        gradient: {
          shadeIntensity: 1,
          gradientToColors: ["#57F287"],
          opacityFrom: 0.9,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
    };

    const newUsers = traffic.filter(
      (x) =>
        x.joined && new Date(parseInt(x.createdAt)).setHours(0, 0, 0, 0) === now
    );
    const leftUsers = traffic.filter(
      (x) =>
        !x.joined &&
        new Date(parseInt(x.createdAt)).setHours(0, 0, 0, 0) === now
    );
    let ratio = "0";

    if (leftSeries.length > 0 && newUsers.length > 0) {
      ratio = (newUsers.length / leftUsers.length).toFixed(2);
    }
    body = (
      <>
        <Flex
          flex={1}
          direction="row"
          justifyContent="center"
          position="relative"
          mt="60px"
        >
          <HStack spacing={16} flexWrap="wrap">
            <UserJoins data={count} text="total users" color="white" />
            <UserJoins
              data={newUsers.length}
              text="joined in 24h"
              color="green.500"
            />
            <UserJoins
              data={leftUsers.length}
              text="left in 24h"
              color="red.500"
            />
            <UserJoins data={ratio} text="ratio" color="white" />
          </HStack>
        </Flex>
        <Flex
          flex={1}
          direction="row"
          justifyContent="space-evenly"
          // position="relative"
          mt="90px"
        >
          <Box bg="gray.700" p={5}>
            <Heading ml="22px">Joined</Heading>
            <Chart
              options={fakeOptions as any}
              series={fakeOptions.series}
              type="area"
              width="500"
            />
          </Box>
          <Box bg="gray.700" p={5}>
            <Heading ml="22px">Left - TODO</Heading>
            <Chart
              options={fakeOptions as any}
              series={fakeOptions.series}
              type="area"
              width="500"
            />
          </Box>
        </Flex>
      </>
    );
  } else if (!fetching && !data?.guildTraffic) {
    body = (
      <>
        <Flex
          flex={1}
          direction="row"
          justifyContent="center"
          position="relative"
          mt="60px"
        >
          <HStack spacing={16} flexWrap="wrap">
            <UserJoins data="No Data" text="total users" color="white" />
            <UserJoins data="No Data" text="joined in 24h" color="green.500" />
            <UserJoins data="No Data" text="left in 24h" color="red.500" />
            <UserJoins data="No Data" text="ratio" color="white" />
          </HStack>
        </Flex>
        <div id="chartleft"></div>
        <div id="chartjoin"></div>
      </>
    );
  }

  return body;
};
