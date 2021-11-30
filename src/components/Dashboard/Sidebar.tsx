import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import { FC } from "react";
import {
  useHistory,
  useRouteMatch,
  useParams,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import {
  DiscordGuilds,
  MeQuery,
  useLogoutMutation,
} from "../../generated/graphql";
import { Server } from "../Server";
import { MdOutlineSummarize } from "react-icons/md";
import { IoSettingsOutline, IoTrophyOutline } from "react-icons/io5"
import { BsShield } from "react-icons/bs"
import { AiOutlineContainer }  from "react-icons/ai"
import { SideItem } from "./SideItem";

type Props = {
  meData: MeQuery | undefined;
  guildsData: DiscordGuilds[] | null | undefined;
} & RouteComponentProps;

const Sidebar: FC<Props> = ({ meData, guildsData }) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();
  const [, logout] = useLogoutMutation();
  let { url } = useRouteMatch();

  // useEffect(() => {
  //   if (!meData?.me) {
  //     history.push("/");
  //   }
  // }, [history, meData]);

  const handleClick = () => {
    history.push("/");
  };
  const parsed = parseInt(id, 10);
  if (!parsed) {
    url = "/playground";
  }
  return (
    <Box pos="fixed" left="0" bottom="0" top="0">
      <Box pos="fixed" bottom="0" left="0" top="0">
        <Box left="0" bottom="0" w="300px" h="100%">
          <Box
            float="left"
            w="70px"
            h="100%"
            bg="gray.800"
            alignContent="center"
            overflow="auto"
            css={{ scrollbarWidth: "none" }}
          >
            {guildsData !== null
              ? guildsData?.map((guild, idx) => (
                  <Server
                    key={idx}
                    id={guild.id}
                    name={guild.name}
                    icon={guild.icon}
                    inGuild={guild.in}
                  />
                ))
              : null}
          </Box>
          <Box h="100%" bg="gray.700">
            <Flex
              cursor="pointer"
              pt="10px"
              pb="10px"
              borderBottom="1px solid"
              borderColor="gray.600"
              onClick={() => handleClick()}
            >
              <Avatar
                bg="none"
                src="https://cdn.discordapp.com/app-icons/778035878932119602/39b999d289809ca49089db10372321b7.png"
              />
              <Heading m="auto 7px" size="lg" color="wuffel">
                Wuffel
              </Heading>
            </Flex>
            <Box
              overflow="auto"
              style={{ scrollbarWidth: "none" }}
              pb="140px"
              h="100%"
            >
              <SideItem
                url={`${url}/summary`}
                p="Summary"
                icon={MdOutlineSummarize}
              />
              <SideItem
                url={`${url}/settings`}
                p="Settings"
                icon={IoSettingsOutline}
              />
              <SideItem
                url={`${url}/logs`}
                p="Logs"
                icon={AiOutlineContainer}
              />
              <SideItem
                url={`${url}/moderation`}
                p="Moderation"
                icon={BsShield}
              />
              <SideItem
                url={`${url}/streamerranking`}
                p="Streamer Ranking"
                icon={IoTrophyOutline}
              />
            </Box>
            <Box
              w="230px"
              p="5px"
              pt="10px"
              pos="absolute"
              bottom="0"
              left="70px"
              borderTop="1px solid"
              borderColor="gray.600"
              bg="gray.700"
            >
              <Menu>
                <MenuButton display="flex" w="100%">
                  <Flex>
                    <Avatar
                      src={`https://cdn.discordapp.com/avatars/${meData?.me?.id}/${meData?.me?.avatar}.png?size=48`}
                    />
                    <Heading size="sm" m="auto 7px">
                      {meData?.me?.username + "#" + meData?.me?.discriminator}
                    </Heading>
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Box pos="absolute" inset="0 0 0 240px"></Box>
    </Box>
  );
};

export default withRouter(Sidebar);
