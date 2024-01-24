import { Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";
import { Patreon } from "./Patreon";
import { UserMenu } from "./UserMenu";

export const Navbar: FC = () => {
  const [{ data }] = useMeQuery();
  let body;  
  

  if (data && !data.me) {
    body = (
      <a href={process.env.REACT_APP_LOGIN_URL}>
        <Text p={3} borderRadius={35}>
          Login
        </Text>
      </a>
    );
  } else if (data?.me) {
    body = (<>
    <NavLink to="/dashboard">
        Dashboard
    </NavLink>
    <UserMenu data={data} /></>);
  }

  return (
    <Flex
      h="70px"
      flex={1}
      width="100%"
      borderBottom="1px solid"
      borderColor="gray.600"
      justifyContent="space-between"
      bg="gray.700"
    >
      <Flex ml="20px">
        <Heading color="wuffel" margin="auto 0" cursor="default">
          Wuffel
        </Heading>
      </Flex>
      <Flex mr="20px">
        <HStack spacing="20px">
          <Tooltip label="Soon" aria-label="Soon">
            <Text cursor="pointer" color="gray.400">Docs</Text>
          </Tooltip>
          {body}
        </HStack>
      </Flex>
    </Flex>
  );
};
