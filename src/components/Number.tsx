import { Flex, Center, Heading } from "@chakra-ui/react";

interface NumberProps {
  value?: number;
}

const Number = (props: NumberProps) => {
  const { value = "?" } = props;

  return (
    <Flex maxW="120px" flex={1}>
      <Center
        w="full"
        h="150px"
        px="24px"
        py="16px"
        bgColor="white"
        borderRadius="md"
        boxShadow="lg"
        flex={1}
      >
        <Heading fontSize="54px" color="gray.500">
          {value}
        </Heading>
      </Center>
    </Flex>
  );
};

export default Number;
