import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useGetPrefixQuery,
  useSetPrefixMutation,
} from "../../../../generated/graphql";

interface Props {}

export const Prefix: FC = () => {
  const { id }: { id: string } = useParams();
  const [value, setValue] = useState("");
  const [{ data }] = useGetPrefixQuery({ variables: { gid: id } });
  const [oldPrefix, setOldPrefix] = useState("");
  const [, setPrefix] = useSetPrefixMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);
  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    if (value.length > 4) return;
    const res = await setPrefix({ gid: id, prefix: value });
    if (res.data?.setPrefix) {
      setOldPrefix(res.data?.setPrefix);
    }
  };

  useEffect(() => {
    if (data?.getPrefix) {
      setOldPrefix(data.getPrefix);
    }
  }, [data?.getPrefix]);

  return (
    <Box bg="gray.700" p={5}>
      <Heading>Prefix</Heading>
      <Text>My default prefix is +, you can change it here.</Text>

      <Input
        onChange={handleChange}
        bg="gray.800"
        mt="30px"
        placeholder={oldPrefix}
      ></Input>
      <Button
        colorScheme="green"
        float="right"
        mt="20px"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Box>
  );
};
