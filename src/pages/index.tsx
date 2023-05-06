import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import Head from "next/head";
import About from "~/components/About";
import CommunityPartners from "~/components/Community-Partners";
import Home from "~/components/Home";
import JoinCommunity from "~/components/Join-Community";
import ReachUs from "~/components/ReachUs";
import RecentEvents from "~/components/Recent-Events";
import Sponsor from "~/components/Sponsors";
import Team from "~/components/Team";
import { Wrapper } from "~/components";

export default function Main() {
  return (
    <Wrapper title="Home">
      {/* Home Components */}
      <section className="home--page">
        <Home />
        <About />
        <Team />
        <RecentEvents />
        <CommunityPartners />
        <Sponsor />
        <ReachUs />
        <JoinCommunity />
      </section>
      <Footer />
    </Wrapper>
  );
}
