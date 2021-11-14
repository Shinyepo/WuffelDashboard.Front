import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { FC } from "react";

export const Patreon: FC = () => {
  function handleClick() {
    window.open("https://www.patreon.com/pl-PL");
  }
  return (
    <Flex>
      <Button
        colorScheme="red"
        bg="red.500"
        color="white"
        onClick={handleClick}
      >
        Patreon
      </Button>
    </Flex>
  );
};
