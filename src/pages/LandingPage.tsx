import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { FC } from "react";
import { Navbar } from "../components/Dashboard/Navbar";

const LandingPage: FC = () => {
  function handleClick() {
    window.open(
      process.env.REACT_APP_INVITE_URL,
      "targetWindow",
      `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=400,height=700`
    );
  }
  return (
    <>
      <Navbar />
      <Flex flex={1} direction="column" alignItems="center">
        <Box boxSize="256px" mt="150px">
          <Image
            src="/icon.png"
            alt="Wuffel"
            objectFit="fill"
            w="256px"
            h="256px"
          />
        </Box>
        <Heading>
          A all purpose{" "}
          <Text as="span" color="wuffel">
            bot
          </Text>{" "}
          for{" "}
          <Text as="span" color="discord">
            Discord
          </Text>
          !
        </Heading>
        <Box>
          <Button
            margin="50px auto"
            display="block"
            bg="#5865F2"
            size="lg"
            onClick={handleClick}
          >
            Invite me!
          </Button>
          {/* <Button>Try</Button> */}
        </Box>
      </Flex>
    </>
  );
};

export default LandingPage;
