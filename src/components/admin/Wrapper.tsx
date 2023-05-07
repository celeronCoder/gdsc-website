import Head from "next/head";
import React from "react";
import styles from "./wrapper.module.css";
import { Barlow } from "next/font/google";
import { signOut } from "next-auth/react";
import Link from "next/link";

const barlow = Barlow({ weight: ["400", "700"], subsets: ["latin"] });

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Head>
        <title>Admin | GDSC VIT Bhopal</title>
      </Head>
      <div style={barlow.style} className={styles.main}>
        <nav className={styles.nav}>
          {/* the primary Link */}
          <div>
            <Link href="/admin" className={styles.primaryLink}>
              GDSC VITB Admin
            </Link>
          </div>

          {/* the other Links */}
          <div className={styles.navLinks}>
            <Link href={"/"} className={styles.link}>
              Home
            </Link>
            <Link href={"/admin"} className={styles.link}>
              Admin
            </Link>
            <Link href={"/admin/events"} className={styles.link}>
              Events
            </Link>
          </div>

          {/* the logout */}
          <button
            onClick={() => signOut({ callbackUrl: window.location.origin })}
            className={styles.logoutBtn}
          >
            Log Out
          </button>
        </nav>
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
};
