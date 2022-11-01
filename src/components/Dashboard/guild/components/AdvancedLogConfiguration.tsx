import { Box, Button, Divider, Flex, Heading, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { OptionProps, Options } from "react-select";
import { GetGuildChannelsQuery } from "../../../../generated/graphql";
import { SelectOption } from "../../../../types";
import { MultiSelect } from "./MultiSelect";

interface Props {
  title: string;
  channelList: GetGuildChannelsQuery;
}

export const AdvancedLogConfiguration: FC<Props> = ({ title, channelList }) => {
  const [loading, setLoading] = useState(false);
  const multiOptions = new Array<SelectOption>();

  channelList.getGuildChannels?.forEach((x, idx) => {
    const option = {
      label: x.name,
      value: x.id,
      isDisabled: true,
    } as SelectOption;
    multiOptions.push(option);

    x.channels?.forEach((a, indx) => {
      const option = {
        label: a.name,
        value: a.id,
        isDisabled: false,
      } as SelectOption;
      multiOptions.push(option);
    });
  });
  console.log(multiOptions);


  return (
    <Flex flex={1} direction="row" m="60px">
      <Box bg="gray.700" p={5}>
        <Heading>{title}</Heading>
        <Divider />
        <MultiSelect channelList={multiOptions} />

        <Button isLoading={loading} colorScheme="green" float="right" mt="20px">
          Save
        </Button>
      </Box>
    </Flex>
  );
};
