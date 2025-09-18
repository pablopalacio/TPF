import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Body from "../components/Body.jsx";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-200">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default Home;