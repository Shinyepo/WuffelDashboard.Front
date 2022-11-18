import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGuildTrafficQuery } from "../../../generated/graphql";
import { RecentActivity } from "../RecentActivity";
import { DailyStatistics } from "./components/DailyStatistics";
import { ReFetchData } from "./components/ReFetchData";
import { TrafficList } from "./components/TrafficList";

interface Props {
  count: string | undefined;
}

export const Summary: FC<Props> = ({ count }) => {
  const { id }: { id: string } = useParams();
  const [{ data },reExec] = useGuildTrafficQuery({ variables: { gid: id } });
  return (
    <>
      <DailyStatistics count={count} trafficData={data} />
      <Flex position="relative" flex={1} flexDirection="row" m="20px" justifyContent="space-between" flexWrap="wrap">
        <Box minW="580px" w="48%" bg="gray.700" p={5} m="3px" h="100%">
          <Heading display="inline-block">
            Last 24h traffic
          </Heading>
          <ReFetchData reFetch={reExec} />
          <Divider />
          <TrafficList trafficData={data} />
        </Box>
      <RecentActivity />
      </Flex>
    </>
  );
};
