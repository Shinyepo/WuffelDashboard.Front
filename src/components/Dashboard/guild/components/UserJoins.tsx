import { Flex, Heading, Text } from "@chakra-ui/layout";
import { FC } from "react";

interface Props {
  data: number | string | undefined;
  text: string;
  color: string;
}

export const UserJoins: FC<Props> = ({ data, text, color }) => (
  <Flex w="200px" h="100px" bg="gray.700" position="relative" p="15px 8px">
    <Heading color={color} fontSize="xxx-large"  margin="auto 0">{data}</Heading>
    <Text fontSize="sm" color="gray.400" position="absolute" right="8px" top="5px">
      {text}
    </Text>
  </Flex>
);
