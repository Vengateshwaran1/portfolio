import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import Skills from './components/Skills'
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Skills/>
      <Portfolio/>
      <Contact />
      <Footer/>
    </div>

    
  );
}

export default App;