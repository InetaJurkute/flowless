import { Box, Heading, Text, Flex } from "@chakra-ui/layout";
import { blueColor, mediumGrayColor } from "../theme/colors";

interface SpendCardProps {
  amount: number;
  measurementUnit: string;
  title: string;
  goalAmount: number;
  icon?: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  hideContent?: boolean;
  onClick?: () => any;
}

export const SpendCard = ({
  amount,
  measurementUnit,
  goalAmount,
  title,
  icon,
  textColor,
  bgColor,
  hideContent,
  onClick,
}: SpendCardProps) => {
  return (
    <Flex
      height="100%"
      justifyContent="space-between"
      boxShadow="base"
      flexDirection="column"
      borderRadius="lg"
      bg={bgColor || mediumGrayColor}
      color={textColor || blueColor}
      padding="16px"
      onClick={onClick}
      cursor="pointer"
      _hover={{ filter: "brightness(0.9)" }}
    >
      <Box>
        {icon && icon}
        <Heading as="h2" fontSize={{ base: "sm", md: "md" }} margin="16px 0">
          {title}
        </Heading>
      </Box>
      <Box hidden={hideContent}>
        <Text fontSize={{ base: "xl", md: "4xl" }} fontWeight="regular">
          {amount} {measurementUnit}
        </Text>
      </Box>
      <Box marginTop="32px" hidden={hideContent}>
        {goalAmount ? (
          <>
            <Text fontSize="sm" fontWeight="regular" display="inline">
              {`out of `}
            </Text>
            <Text fontSize="sm" fontWeight="bold" display="inline">
              {`${goalAmount} ${measurementUnit}`}
            </Text>
            <br />
            <Text fontSize="sm" fontWeight="regular">
              which is your set goal
            </Text>
          </>
        ) : (
          <Text fontSize="sm" fontWeight="regular">
            No goal set
          </Text>
        )}
      </Box>
    </Flex>
  );
};
