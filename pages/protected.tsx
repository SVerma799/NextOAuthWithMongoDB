import React from "react";
import { getSession, useSession } from "next-auth/react";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Protected = () => {
  const { push } = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      push("/auth/signin");
    },
  });

  return <Heading>{session?.user?.email}</Heading>;
};

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/auth/signin",
  //         permanent: false,
  //       },
  //     };
  //   }
  return {
    props: { session },
  };
};

export default Protected;
