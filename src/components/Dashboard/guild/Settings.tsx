import { Flex } from "@chakra-ui/layout";
import { FC } from "react";
import { Prefix } from "./components/Prefix";

export const Settings: FC = () => (
  <>
    <Flex
      flex={1}
      direction="row"
    //   justifyContent="center"
    //   position="relative"
      mt="60px" 
      ml="60px"
    >
        <Prefix />
    </Flex>
  </>
);
