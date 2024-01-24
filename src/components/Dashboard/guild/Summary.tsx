import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import {
  GuildTraffic,
  GuildTrafficQuery,
  useGuildTrafficQuery,
} from "../../../generated/graphql";
import { RecentActivity } from "../RecentActivity";
import { DailyStatistics } from "./components/DailyStatistics";
import { ReFetchData } from "./components/ReFetchData";
import { TrafficList } from "./components/TrafficList";

interface Props {
  count: string | undefined;
}

export const Summary: FC<Props> = ({ count }) => {
  const { id } = useParams();
  const [{ data }, reExec] = useGuildTrafficQuery({ variables: { gid: id! } });

  return (
    <>
      <DailyStatistics count={count} trafficData={id === "1" ? populateMock() : data} />
      <Flex
        position="relative"
        flex={1}
        flexDirection="row"
        m="20px"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box minW="580px" w="48%" bg="gray.700" p={5} m="3px" h="100%">
          <Heading display="inline-block">Last 24h traffic</Heading>
          <ReFetchData reFetch={reExec} />
          <Divider />
          <TrafficList trafficData={id === "1" ? populateMock() : data} />
        </Box>
        <RecentActivity />
      </Flex>
    </>
  );
};

const populateMock = () => {
  const mock: GuildTraffic[] = [];
  const date = new Date();

  mock.push({
    guildId: "1",
    id: 1,
    joined: true,
    userId: "1",
    username: "Member 1",
    createdAt: date.setHours(date.getHours() - 1),
  });
  mock.unshift({
    guildId: "2",
    id: 2,
    joined: true,
    userId: "2",
    username: "Member 2",
    createdAt: date.setHours(date.getHours() - 1),
  });
  mock.unshift({
    guildId: "3",
    id: 3,
    joined: false,
    userId: "3",
    username: "Member 3",
    createdAt: date.setHours(date.getHours() - 1),
  });
  mock.unshift({
    guildId: "4",
    id: 4,
    joined: true,
    userId: "4",
    username: "Member 4",
    createdAt: date.setHours(date.getHours() - 1),
  });
  mock.unshift({
    guildId: "5",
    id: 5,
    joined: false,
    userId: "5",
    username: "Member 5",
    createdAt: date.setHours(date.getHours() - 1),
  });

  return { __typename: "Query", guildTraffic: mock } as GuildTrafficQuery;
};
