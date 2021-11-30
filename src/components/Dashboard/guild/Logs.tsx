import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { ChangeEvent, FC, MouseEvent } from "react";
import { useParams } from "react-router";
import { useGetLogSettingsQuery } from "../../../generated/graphql";
import { FetchingData } from "../FetchingData";

export const Logs: FC = () => {
  const { id }: { id: string } = useParams();
  const [{ data, fetching }] = useGetLogSettingsQuery({variables: {gid: id}});
  let body = <FetchingData />;

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }

  if (!fetching && data?.getLogSettings) {
    body = (
      <Flex flex={1} direction="row" mt="60px" ml="60px">
        <Box bg="gray.700" p={5}>
          <Heading>Logs Configuration</Heading>
          <br />
          {data.getLogSettings.settings?.map((x) => (
            <Box key={x.id}>
              <Heading>{x.name}</Heading>
              <Switch isChecked={x.on} colorScheme="green"></Switch>
              <Input placeholder={x.channel ?? ""}></Input>
            </Box>
          ))}
          <Button
            colorScheme="green"
            float="right"
            mt="20px"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Flex>
    );
  }

  return body;
};
