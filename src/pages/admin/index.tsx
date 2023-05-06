import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { AdminWrapper } from "~/components";
import { authOptions } from "~/server/auth";

export default function AdminPage() {
  return (
    <AdminWrapper>
      <h4>Welcome to the GDSC VIT Bhopal's Admin Page</h4>
      <p style={{ color: "#475569" }}>This is the page only for Admins</p>
    </AdminWrapper>
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
