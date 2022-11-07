import { UseToastOptions } from "@chakra-ui/react";

export const failedRequest = (toast: (options?: UseToastOptions) => void) => {
  return toast({
    status: "error",
    description: "Something went wrong while processing your request.",
    title: "Error",
    isClosable: true,
    duration: 8000,
    position: "top-right",
  });
};

export const successfulRequest = (toast: (options?: UseToastOptions) => void) => {
  return toast({
    status: "success",
    title: "Success",
    description: "Your request has been processed successfully",
    isClosable: true,
    duration: 8000,
    position: "top-right",
  });
};
