import { Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex mb="64px">
      <Heading mr="16px" fontSize="36px" color="twitter.500">
        High
      </Heading>
      <Heading fontSize="36px" color="facebook.500">
        Low
      </Heading>
    </Flex>
  );
};

export default Header;
