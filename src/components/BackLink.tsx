import { Link } from "@chakra-ui/layout";
import { Link as ReactLink } from "react-router-dom";

export const BackLink = () => {
  return (
    <Link
      as={ReactLink}
      to="/flowless"
      maxW="sm"
      padding="10px 14px 10px 14px"
      borderWidth="1px"
      rounded="md"
      style={{
        marginTop: "10px",
        display: "inline-flex",
      }}
    >
      Back
    </Link>
  );
};
