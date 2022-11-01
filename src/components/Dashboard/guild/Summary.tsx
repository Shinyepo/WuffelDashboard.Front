import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGuildTrafficQuery } from "../../../generated/graphql";
import { RecentActivity } from "../RecentActivity";
import { DailyStatistics } from "./components/DailyStatistics";
import { TrafficList } from "./components/TrafficList";

interface Props {
  count: string | undefined;
}

export const Summary: FC<Props> = ({ count }) => {
  const { id }: { id: string } = useParams();
  const [{ data }] = useGuildTrafficQuery({ variables: { gid: id } });
  return (
    <>
      <DailyStatistics count={count} trafficData={data} />
      <Flex position="relative" flex={1} flexDirection="row" m="20px" justifyContent="space-between">
        <Box minW="48%" bg="gray.700" p={5}>
          <Heading textAlign="center" mt="2">
            Last 24h traffic
          </Heading>
          <Divider />
          <TrafficList trafficData={data} />
        </Box>
      <RecentActivity />
      </Flex>
    </>
  );
};
