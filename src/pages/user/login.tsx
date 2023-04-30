import { Lato } from "next/font/google";
import styles from "./login.module.css";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { signIn } from "next-auth/react";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export default function LoginPage() {
  return (
    <div style={lato.style} className={styles.main}>
      <div className={styles.card}>
        <h2>Admin Login</h2>
        <button
          onClick={() =>
            signIn("github", { callbackUrl: `${window.location.origin}/admin` })
          }
          className={styles.btn}
        >
          Login With Github
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return {
    props: { session },
    redirect:
      session !== null
        ? {
            destination: "/",
            permanent: true,
          }
        : undefined,
  };
};
