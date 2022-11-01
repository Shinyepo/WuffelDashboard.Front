import {
  Box,
  Heading,
  Button,
  Switch,
  Tooltip,
  Icon,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState, MouseEvent } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useToggleBotMutation } from "../../../../generated/graphql";
import {
  failedRequest,
  successfulRequest,
} from "../../../../utilities/Toaster";

interface Props {
  activeStatus: boolean;
}

const desc =
  "Turning off this switch will result in disabling the bot for this server. All your settings will preserve and you can still change them but the bot will not react to any interaction on the server.";

export const MainSwitch: FC<Props> = ({ activeStatus }) => {
  const [activeState, setActiveState] = useState(activeStatus);
  const [loading, setLoading] = useState(false);
  const { id }: { id: string } = useParams();
  const [, toggleBot] = useToggleBotMutation();
  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveState(!activeState);
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await toggleBot({ id, state: activeState });
    setLoading(false);
    if (res.error || !res.data) return failedRequest(toast);

    setActiveState(res.data.toggleBot);
    successfulRequest(toast);
  };

  return (
    <Box bg="gray.700" p={5} minW="400px" position="relative">
      <Tooltip label={desc} placement="bottom">
        <Box display="flex">
          <Heading d="inline-block">Main Switch</Heading>
          <Icon m="auto 10px" as={AiOutlineQuestionCircle} boxSize={5} />
        </Box>
      </Tooltip>
      <Divider />
      <Switch
        size="lg"
        mt="30px"
        isChecked={activeState}
        onChange={handleChange}
      />
      <Button
        pos="absolute"
        right="20px"
        bottom="20px"
        isLoading={loading}
        colorScheme="green"
        float="right"
        mt="20px"
        onClick={handleClick}
      >
        Save
      </Button>
    </Box>
  );
};
