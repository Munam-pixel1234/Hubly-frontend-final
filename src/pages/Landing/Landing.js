import Navbar from "../../components/Navbar/Navbar";
import ChatButton from "../../components/ChatWidget/ChatButton";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import CoreSection from "../../components/CoreSection/CoreSection";
import Plans from "../../components/Plans/Plans";


const Landing = () => {
  return (
    <div className="landingPage">
      <Navbar />

      <Hero />
      <CoreSection />
      <Plans />

      {/* Chat Widget Button */}
      <ChatButton />

      {/* Footer Added */}
      <Footer />
    </div>
  );
};

export default Landing;
