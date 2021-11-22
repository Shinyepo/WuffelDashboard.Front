import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { OperationContext } from "@urql/core";
import { FC } from "react";

interface Props {
  id: string;
  handleClose: (opts?: Partial<OperationContext> | undefined) => void;
  handleSorting: () => void;
}

export const NotInvited: FC<Props> = ({ id, handleClose, handleSorting }) => {
  function handleClick (){
    const win = window.open(
      `https://discord.com/api/oauth2/authorize?client_id=613073438902452239&permissions=8&redirect_uri=http%3A%2F%2F192.168.1.14%3A8080%2Fdashboard&scope=bot&guild_id=${id}&disable_guild_select=true`,
      "targetWindow",
      `toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=400,height=700`
    );

    var timer = setInterval(async () => {
      if(win?.closed) {
          clearInterval(timer);
          await handleClose({ requestPolicy: "network-only"});
          handleSorting();
      }
  }, 1000);
  }
  return (
    <Flex flex={1} justifyContent="center">
      <Box display="table" margin="200px">
        <Image
          src="https://i.imgur.com/iwUocCr.png"
          boxSize="150px"
          objectFit="cover"
          margin="auto"
        />
        <Heading margin="50px 0">I'm not invited to the party :(</Heading>
          <Button
          margin="50px auto"
            display="block"
            bg="#5865F2"
            size="lg"
            onClick={handleClick}
          >
            Invite me!
          </Button>
      </Box>
    </Flex>
  );
};
