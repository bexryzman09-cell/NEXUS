import Header from '../components/layout/Header';
import ControlPanel from '../components/layout/ControlPanel';
import CustomCursor from '../components/layout/CustomCursor';
import ToastContainer from '../components/layout/ToastContainer';
import Footer from '../components/layout/Footer';
import Quiz from '../components/Quiz';

export default function TestPage() {
    return (
        <>
            <CustomCursor />
            <ToastContainer />
            <ControlPanel />
            <Header />
            <Quiz />
            <Footer />
        </>
    );
}
