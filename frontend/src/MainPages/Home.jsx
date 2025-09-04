import Hero from "../HomePages/Hero";
import Features from "../HomePages/Features";
import HowItWorks from "../HomePages/HowItWorks";
import WhyChooseUs from "../HomePages/WhyChooseUs";
import Demo from "../HomePages/Demo";
import Cta from "../HomePages/cta";
import Footer from "../HomePages/footer";
function Home(){
    return(
        <>
            <Hero/>
            <Features/>
            <HowItWorks/>
            <WhyChooseUs/>
            <Demo/>
            <Cta/>
            <Footer/>
        </>
    )
}

export default Home;