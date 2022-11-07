import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import { Avatar, Portal } from "@chakra-ui/react";
import { FC } from "react";
import { MeQuery, useLogoutMutation } from "../../generated/graphql";

interface Props {
  data: MeQuery;
  full?: boolean;
};
export const UserMenu: FC<Props> = ({ data, full }) => {
  const [, logout] = useLogoutMutation();
  
  return (
    <Menu>
      <MenuButton display="flex" w="100%">
        <Flex>
          <Avatar
            src={`https://cdn.discordapp.com/avatars/${data!.me?.userId}/${data!.me?.avatar}.png?size=48`}
          />
          {full ? (
            <Heading size="sm" m="auto 7px">
              {data!.me?.username + "#" + data!.me?.discriminator}
            </Heading>
          ) : (
            ""
          )}
        </Flex>
      </MenuButton>
      <Portal>
        <MenuList placeContent="end">
          <MenuItem>
            <Text>Profile</Text>
          </MenuItem>
          <MenuItem onClick={async () => await logout()}>
            <Text>Logout</Text>
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
