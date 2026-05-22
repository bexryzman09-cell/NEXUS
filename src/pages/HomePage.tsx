import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Loader from '../components/layout/Loader';
import Header from '../components/layout/Header';
import ControlPanel from '../components/layout/ControlPanel';
import CustomCursor from '../components/layout/CustomCursor';
import ScrollTop from '../components/layout/ScrollTop';
import ToastContainer from '../components/layout/ToastContainer';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import About from '../components/sections/About';
import Courses from '../components/sections/Courses';
import Programs from '../components/sections/Programs';
import Teachers from '../components/sections/Teachers';
import Students from '../components/sections/Students';
import Partners from '../components/sections/Partners';
import News from '../components/sections/News';
import FAQ from '../components/sections/FAQ';
import MapSection from '../components/sections/MapSection';
import Contact from '../components/sections/Contact';

export default function HomePage() {
    const { loading } = useApp();

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } }),
            { threshold: 0.15 }
        );
        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [loading]);

    if (loading) return <Loader />;

    return (
        <>
            <Loader />
            <CustomCursor />
            <ToastContainer />
            <ScrollTop />
            <ControlPanel />
            <Header />
            <main>
                <Hero />
                <Stats />
                <About />
                <Courses />
                <Programs />
                <Teachers />
                <Students />
                <Partners />
                <News />
                <FAQ />
                <MapSection />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
