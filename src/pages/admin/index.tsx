import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Lato } from "next/font/google";
import styles from "./admin.module.css";
import Head from "next/head";
import { signOut } from "next-auth/react";
import Link from "next/link";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin | GDSC VIT Bhopal</title>
      </Head>
      <div style={lato.style} className={styles.main}>
        <nav className={styles.nav}>
          {/* the primary Link */}
          <div>
            <Link href="/admin" className={styles.primaryLink}>
              GDSC VITB Admin
            </Link>
          </div>

          {/* the other Links */}
          <div className={styles.navLinks}>
            <Link href={"/admin/events"} className={styles.link}>
              Events
            </Link>
          </div>

          {/* the logout */}
          <div>
            <button onClick={() => signOut()} className={styles.logoutBtn}>
              Log Out
            </button>
          </div>
        </nav>
        <main className={styles.container}>
          <h1>Welcome to the GDSC VIT Bhopal's Admin Page</h1>
          <p className={styles.secondary}>This is the page only for Admins</p>
        </main>
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
