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
  Icon,
  Tooltip,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useParams } from "react-router";
import {
  SettingsArgumentType,
  useGetGuildChannelsQuery,
  useGetLogSettingsQuery,
  useSetLogSettingsMutation,
} from "../../../generated/graphql";
import { DiscordEvents } from "../../../types";
import { failedRequest, successfulRequest } from "../../../utilities/Toaster";
import { FetchingData } from "../FetchingData";
import { AdvancedLogConfiguration } from "./components/AdvancedLogConfiguration";

export const Logs: FC = () => {
  const { id }: { id: string } = useParams();
  const [loading, setLoading] = useState(false);
  const [logConfig, setLogConfig] = useState([] as Array<SettingsArgumentType>);
  const toast = useToast();
  const [, setLogSettings] = useSetLogSettingsMutation();

  const [{ data, fetching }] = useGetLogSettingsQuery({
    variables: { gid: id },
  });
  const [{ data: channels, fetching: fetchingChannels }] =
    useGetGuildChannelsQuery({ variables: { gid: id } });
  let body = <FetchingData />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const result = await setLogSettings({ gid: id, settings: logConfig });
    setLoading(false);
    if (result.error) return failedRequest(toast);
    successfulRequest(toast);
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
        id: logConfig.length,
        name: name,
        channel: value,
        on: false,
      } as SettingsArgumentType;
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
        id: logConfig.length,
        name: name,
        channel: "",
        on: checked,
      } as SettingsArgumentType;
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
          delete x.ignored?.__typename;
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
      <>
        <Flex
          flex={1}
          flexWrap="wrap"
          justifyContent="space-between"
          direction="row"
          m="60px"
        >
          <Box bg="gray.700" p={5}>
            <Heading>Logs Configuration</Heading>
            <Divider />
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(2, 2fr)" gap={4}>
                {DiscordEvents.map((x, idx) => {
                  return (
                    <Box w="100%" mt="5" key={idx}>
                      <FormControl id={x.name} key={idx} maxW="400px">
                        <Tooltip label={x.description} placement="bottom-start">
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
                isLoading={loading}
                colorScheme="green"
                mt="20px"
                float="right"
                // isLoading={props.isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </form>
          </Box>
          {DiscordEvents.map((x) => {
            const ignored = data.getLogSettings.settings?.find(
              (a) => a.name === x.name
            )?.ignored;
            return (
              <AdvancedLogConfiguration
                ignored={ignored ?? undefined}
                ignoreType={x.type}
                event={x.name}
                displayName={x.displayName}
                channelList={channels}
              />
            );
          })}
        </Flex>
      </>
    );
  }

  return body;
};
