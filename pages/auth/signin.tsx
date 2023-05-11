import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperTest,
  Input,
  chakra,
} from "@chakra-ui/react";

import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub, BsTwitter, BsGoogle } from "react-icons/bs";

const providers = [
  {
    name: "Github",
    Icon: BsGithub,
  },
  {
    name: "Twitter",
    Icon: BsTwitter,
  },
  {
    name: "Google",
    Icon: BsGoogle,
  },
];

const SignIn = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [email, setEmail] = React.useState("");
  if (status === "loading")
    return <Heading>Checking Authentication...</Heading>;

  if (session) {
    setTimeout(() => {
      push("/");
    }, 5000);

    return (
      <Heading>You are already signed in as {session.user?.email}</Heading>
    );
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!email) return false;
    console.log(email);
    signIn("email", { email, redirect: false });
  };

  return (
    <Box>
      <chakra.form onSubmit={handleSubmit}>
        <FormLabel>Email Adress</FormLabel>
        <Input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button type="submit" w="100%" my={5}>
          Sign in with Email
        </Button>
      </chakra.form>
      <VStack>
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            onClick={() => signIn(name.toLowerCase())}
            leftIcon={<Icon />}
            colorScheme="teal"
            variant="outline"
          >
            Sign in with {name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default SignIn;
