import { Flex, HStack } from "@chakra-ui/layout";
import { FC } from "react";
import { GuildTrafficQuery } from "../../../../generated/graphql";
import { FetchingData } from "../../FetchingData";
import { UserJoins } from "./UserJoins";

interface Props {
  count: string | undefined;
  trafficData: GuildTrafficQuery | undefined;
}

export const DailyStatistics: FC<Props> = ({ count, trafficData }) => {
  let body = <FetchingData />;
  

  if (trafficData && trafficData?.guildTraffic) {
    const traffic = trafficData.guildTraffic;
    console.log(traffic);
    
    const left = traffic.filter((x) => !x.joined).length;
    const joined = traffic.filter((x) => x.joined).length;

    let ratio = Math.floor((joined / left) * 100) / 100;
    if (!ratio) ratio = 0;
    const cCount = parseInt(count!);
    const displayCount = !isNaN(cCount) ? (cCount > 1000 ? (cCount / 1000).toFixed(1) + "k" : cCount) : 0;

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
            <UserJoins data={displayCount} text="Total users" color="white" />
            <UserJoins data={joined} text="Joined in 24h" color="green.500" />
            <UserJoins data={left} text="Left in 24h" color="red.500" />
            <UserJoins data={ratio} text="Ratio" color="white" />
          </HStack>
        </Flex>
      </>
    );
  } else if (trafficData && !trafficData.guildTraffic) {
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
      </>
    );
  }

  return body;
};
