import React from "react";
import { Heading, Button, Grid } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session } = useSession();

  const { push, asPath } = useRouter();

  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };

  return (
    <Grid placeItems="center" gridRowGap="1rem">
      {session ? (
        <>
          <Heading className="m-2">Signed in as {session.user?.email}</Heading>
          {/* What we are doing over here is that making sure that the page do not reload.  */}
          {/* and even when we are calling the different route. */}
          <Button
            onClick={async () => {
              var data = await signOut({
                redirect: false,
                callbackUrl: "/",
              });
              push(data.url);
            }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Heading className="m-2">Not signed in</Heading>
          <Button
            onClick={() => {
              handleSignIn();
            }}
          >
            Sign in
          </Button>
        </>
      )}
    </Grid>
  );
};

export default Home;
