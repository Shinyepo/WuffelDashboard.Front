import {
  Button,
  Switch,
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Grid,
  Text,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useParams } from "react-router";
import {
  LogObject,
  SettingsArgumentType,
  useGetGuildChannelsQuery,
  useGetLogSettingsQuery,
  useSetLogSettingsMutation,
} from "../../../generated/graphql";
import { FetchingData } from "../FetchingData";

const DiscordEvents = [
  {
    name: "messageEvents",
    displayName: "Message Events",
    description: "Message deleted and updated events.",
  },
  {
    name: "threadEvents",
    displayName: "Thread events",
    description: "Thread created, deleted and updated events.",
  },
  {
    name: "channelEvents",
    displayName: "Channel Events",
    description: "Channel created, deleted and updated events.",
  },
  {
    name: "roleEvents",
    displayName: "Role events",
    description: "Role created, deleted and updated events.",
  },
  {
    name: "emojiEvents",
    displayName: "Emoji Events",
    description: "Emoji created, deleted and updated events.",
  },
  {
    name: "guildBanEvents",
    displayName: "Guild bans and kicks Events",
    description: "Guild bans, unbans and kicks events.",
  },
  {
    name: "guildMemberEvents",
    displayName: "Guild member events",
    description:
      "Guild members avatar update, role update and nickname update events.",
  },
  {
    name: "guildTraffic",
    displayName: "Guild traffic events",
    description: "Guild members joined and left events.",
  },
  {
    name: "voiceEvents",
    displayName: "Voice presence events",
    description: "Guild members joined, left and started streaming events.",
  },
];

export const Logs: FC = () => {
  const { id }: { id: string } = useParams();
  const [logConfig, setLogConfig] = useState([] as SettingsArgumentType[]);
  const [, setLogSettings] = useSetLogSettingsMutation();

  const [{ data, fetching }] = useGetLogSettingsQuery({
    variables: { gid: id },
  });
  const [{ data: channels, fetching: fetchingChannels }] =
    useGetGuildChannelsQuery({ variables: { gid: id } });
  let body = <FetchingData />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await setLogSettings({ gid: id, settings: logConfig });
    console.log(result);
  };

  const handleSelectChange = ({
    target: { id: name, value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const setting = logConfig.find((x) => x.name === name);
    if (setting) {
      setting.channel = value;
      setLogConfig(logConfig);
      console.log("exists: ", logConfig);
    } else {
      const newEntry = {
        id: logConfig.length.toString(),
        name: name,
        channel: value,
        on: false,
      } as LogObject;
      logConfig.push(newEntry);
      setLogConfig(logConfig);
      console.log("newEntry: ", logConfig);
    }
  };
  const handleSwitchChange = ({
    target: { id: name, checked },
  }: ChangeEvent<HTMLInputElement>) => {
    const setting = logConfig.find((x) => x.name === name);
    if (setting) {
      setting.on = checked;
      setLogConfig(logConfig);
      console.log("exists: ", logConfig);
    } else {
      const newEntry = {
        id: logConfig.length.toString(),
        name: name,
        channel: "",
        on: checked,
      } as LogObject;
      logConfig.push(newEntry);
      setLogConfig(logConfig);
      console.log("newEntry: ", logConfig);
    }
  };

  useEffect(() => {
    if (!fetching && data?.getLogSettings) {
      if (data.getLogSettings.settings) {
        data.getLogSettings.settings.forEach((x) => {
          delete x.__typename;
        });
        setLogConfig(data.getLogSettings.settings);
      }
    }
  }, [fetching, data?.getLogSettings]);

  if (
    !fetching &&
    data?.getLogSettings &&
    !fetchingChannels &&
    channels?.getGuildChannels
  ) {
    body = (
      <Flex flex={1} direction="row" m="60px">
        <Box bg="gray.700" p={5} w="100%">
          <Heading>Logs Configuration</Heading>
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="repeat(3, 2fr)" gap={4}>
              {DiscordEvents.map((x, idx) => {
                return (
                  <Box w="100%" mt="5">
                    <FormControl id={x.name} key={idx} maxW="400px">
                      <Tooltip label={x.description} placement="bottom">
                        <FormLabel
                          d="inline"
                          htmlFor={x.name}
                          fontSize="xl"
                          fontWeight={600}
                        >
                          {x.displayName}
                          <Icon
                            as={AiOutlineQuestionCircle}
                            boxSize={5}
                            ml="6px"
                          />
                        </FormLabel>
                      </Tooltip>
                      <Switch
                        id={x.name}
                        float="right"
                        m="0 auto"
                        defaultChecked={
                          data.getLogSettings.settings?.find(
                            (s) => s.name === x.name
                          )?.on
                        }
                        colorScheme="green"
                        onChange={handleSwitchChange}
                      ></Switch>
                      <Select
                        id={x.name}
                        placeholder="-- Not Selected --"
                        defaultValue={
                          data.getLogSettings.settings?.find(
                            (s) => s.name === x.name
                          )?.channel ?? ""
                        }
                        mt="5px"
                        onChange={handleSelectChange}
                      >
                        {channels.getGuildChannels?.map((x, idx) => {
                          return (
                            <>
                              <option key={idx} value={x.id} disabled={true}>
                                {x.name}
                              </option>
                              {x.channels?.map((a, indx) => (
                                <option key={indx} value={a.id}>
                                  {a.name}
                                </option>
                              ))}
                            </>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                );
              })}
            </Grid>
            <Button
              colorScheme="green"
              mt="20px"
              // isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    );
  }

  return body;
};
