import { Box, Heading, BoxProps, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

interface ChallengeCardProps extends BoxProps {
    title: string;
    subtext: string;
    onClick: () => void;
}

export const ChallengeCard = ({
    title,
    onClick,
    subtext,
    ...rest
}: ChallengeCardProps) => {
    return (
        <Button onClick={onClick}>
            <Box p={5} shadow="md" borderWidth="1px" {...rest}>
                <Heading fontSize="xl">{title}</Heading>
                <Text>{subtext}</Text>
            </Box>
        </Button>
    )
};
