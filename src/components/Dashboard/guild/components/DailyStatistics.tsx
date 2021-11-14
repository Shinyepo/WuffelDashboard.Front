import { Flex, HStack  } from "@chakra-ui/layout";
import { FC } from "react";
import { UserJoins } from "./UserJoins";

interface Props {}

export const DailyStatistics: FC<Props> = () => {
  return (
    <Flex
      flex={1}
      direction="row"
      justifyContent="center"
      position="relative"
      mt="60px"
    >
      <HStack spacing={16} flexWrap="wrap">
        <UserJoins data="1254" text="total users" color="white" />
        <UserJoins data="50" text="joined in 24h" color="green.500" />
        <UserJoins data="42" text="left in 24h" color="red.500" />
        <UserJoins data={`${Math.ceil((50/42) *100)/100}`} text="bilans" color="white" />
      </HStack>
    </Flex>
  );
};
