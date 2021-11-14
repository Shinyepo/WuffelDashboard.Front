import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { FC } from "react";
import { Navbar } from "../components/Dashboard/Navbar";

const LandingPage: FC = () => {
  function handleClick() {
    const win = window.open(
      `https://discord.com/api/oauth2/authorize?client_id=613073438902452239&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fplayground&scope=bot`,
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
            src="https://cdn.discordapp.com/app-icons/778035878932119602/39b999d289809ca49089db10372321b7.png?size=256"
            alt="Wuffel"
            objectFit="fill"
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
