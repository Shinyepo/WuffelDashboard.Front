import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useParams } from "react-router";

interface Props {}

export const Prefix: FC = () => {
  // const [{data, fetching}] = useGetPrefixQuery();
  const { id }: {id: string} = useParams();
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
  const handleSubmit = (event: MouseEvent) => {
      event.preventDefault();
    //   const [{}] = useSetPrefixMigration({variables: { gid: id, value}});

  }

  return (
    <Box bg="gray.700" p={5}>
      <Heading>Prefix</Heading>
      <Text>My default prefix is +, you can change it here.</Text>

      <Input onChange={handleChange} bg="gray.800" mt="30px">
      {/* placeholder={data.getPrefix.prefix} */}
      </Input>
      <Button colorScheme="green" float="right" mt="20px" onClick={handleSubmit}>Save</Button>
    </Box>
  );
};
