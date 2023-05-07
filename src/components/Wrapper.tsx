import Head from "next/head";
import Navbar from "./Navbar";

export const Wrapper: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ title, children }) => {
  return (
    <div className="main--container">
      <Head>
        <title>{title} | GDSC x VITB</title>
      </Head>
      <Navbar />
      {children}
    </div>
  );
};
