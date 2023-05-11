import React from "react";
import { Heading, Button } from "@chakra-ui/react";
import { useSession, getSession } from "next-auth/react";

const Cart = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      return {
        redirect: {
          destination: "/auth/signin",
          permanent: false,
        },
      };
    },
  });

  return (
    <>
      <Heading>Cart</Heading>
      <Button>Add Items</Button>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Cart;
