import { Box, Heading, Text, Flex } from "@chakra-ui/layout";
import { blueColor, mediumGrayColor } from "../theme/colors";

interface SpendCardProps {
  amount: number;
  measurementUnit: string;
  title?: string;
  icon?: React.ReactNode;
  textColor?: string;
  bgColor?: string;
  hideContent?: boolean;
  customText: string;
  isAboveAverage?: boolean;
  subTitle?: string;
}

export const HorizontalCard = ({
  amount,
  measurementUnit,
  title,
  icon,
  textColor,
  bgColor,
  hideContent,
  customText,
  isAboveAverage,
  subTitle,
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
    >
      <Box>
        {icon && icon}
        <Text fontSize="sm" fontWeight="medium">
          {customText}
        </Text>
      </Box>
      <Box margin="18px 0 8px">
        {title && (
          <>
            <Heading as="h2" fontSize={{ base: "lg", md: "xl" }}>
              {title}
            </Heading>
            <Text fontSize="sm" fontWeight="medium" display="inline">
              {subTitle}
            </Text>
          </>
        )}
        <Text fontSize={{ base: "xl", md: "4xl" }} fontWeight="regular">
          {amount} {measurementUnit}
        </Text>
      </Box>
      <Box hidden={hideContent}>
        <Text fontSize="sm" fontWeight="medium" display="inline">
          {`${isAboveAverage ? "above" : "below"} the global average`}
        </Text>
      </Box>
    </Flex>
  );
};
