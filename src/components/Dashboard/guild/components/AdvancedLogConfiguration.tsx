import {
  Box,
  Button,
  Divider,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  GetGuildChannelsQuery,
  IgnoredLogObject,
  useSetIgnoredSettingsMutation,
} from "../../../../generated/graphql";
import { IgnoreType, SelectOption } from "../../../../types";
import {
  failedRequest,
  successfulRequest,
} from "../../../../utilities/Toaster";
import { MultiSelect } from "./MultiSelect";

interface Props {
  event: string;
  ignoreType: IgnoreType;
  displayName: string;
  channelList: GetGuildChannelsQuery;
  ignored?: IgnoredLogObject;
}

export const AdvancedLogConfiguration: FC<Props> = ({
  event,
  ignored,
  displayName,
  ignoreType,
  channelList,
}) => {
  const { id }: { id: string } = useParams();
  const [loading, setLoading] = useState(false);
  const multiOptions = new Array<SelectOption>();
  const [selectedChannels, setSelectedChannels] = useState<SelectOption[]>();
  const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>();
  const [, saveSettings] = useSetIgnoredSettingsMutation();
  const toast = useToast();

  const defaultValue = new Array<SelectOption>();

  channelList.getGuildChannels?.forEach((x) => {
    const option = {
      label: x.name,
      value: x.id,
      isDisabled: true,
    } as SelectOption;
    multiOptions.push(option);

    x.channels?.forEach((a) => {
      const option = {
        label: a.name,
        value: a.id,
        isDisabled: false,
      } as SelectOption;

      if (ignored) {
        const found = ignored.channels?.find((x) => x === a.id);
        if (found) {
          defaultValue.push(option);
        }
      }
      multiOptions.push(option);
    });
  });

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    const channels = selectedChannels?.map((x) => x.value);
    const users = selectedUsers?.map((x) => x.value);
    const res = await saveSettings({
      event: e.currentTarget.name,
      id,
      settings: {
        channels,
        users,
      },
    });
    setLoading(false);
    if (!res) return failedRequest(toast);
    return successfulRequest(toast);
  };

  return (
    <Box mt="30px" minW="400px">
      <Box pb="20px" bg="gray.700" p={5}>
        <Heading>{displayName}</Heading>
        <Divider />
        {ignoreType === IgnoreType.channel || ignoreType === IgnoreType.all ? (
          <Box mt="10px">
            <Heading size="md" my="5px">
              Channels to ignore
            </Heading>
            <MultiSelect
              setSelected={setSelectedChannels}
              type="channel"
              defaultValue={defaultValue}
              channelList={multiOptions}
            />
          </Box>
        ) : null}
        {ignoreType === IgnoreType.user || ignoreType === IgnoreType.all ? (
          <Box mt="10px">
            <Heading my="5px" size="md">
              Users to ignore
            </Heading>
            <MultiSelect
              setSelected={setSelectedUsers}
              type="user"
              channelList={multiOptions}
            />
          </Box>
        ) : null}

        <Button
          name={event}
          isLoading={loading}
          onClick={handleClick}
          colorScheme="green"
          mt="20px"
          float="right"
        >
          Save
        </Button>
        <Box style={{ clear: "both" }}></Box>
      </Box>
    </Box>
  );
};
