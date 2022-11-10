import { Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { OperationContext } from "urql";

interface Props {
  reFetch: (opts?: Partial<OperationContext> | undefined) => void;
}

export const ReFetchData: FC<Props> = ({ reFetch }) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const handleClick = async () => {
    setDisabled(true);
    setLoading(true);
    await reFetch({ requestPolicy: "network-only" });
    setLoading(false);
    await setTimeout(() => setDisabled(false), 30000);
  };
  return (
    <Button
      isLoading={loading}
      isDisabled={disabled}
      bg="gray.800"
      float="right"
      onClick={handleClick}
    >
      <AiOutlineReload />
    </Button>
  );
};
