import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Lato } from "next/font/google";
import styles from "./admin.module.css";
import Head from "next/head";
import { signOut } from "next-auth/react";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin | GDSC VIT Bhopal</title>
      </Head>
      <div style={lato.style} className={styles.main}>
        admin page
        <button onClick={() => signOut()}>log out</button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return {
    props: { session },
    redirect:
      session === null
        ? {
            destination: "/user/login",
            permanent: true,
          }
        : undefined,
  };
};
