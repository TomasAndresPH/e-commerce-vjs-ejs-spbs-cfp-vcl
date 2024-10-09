import {React} from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Componentes
import CarouselSection from '../components/landing-exclusive/carrousel/Carrousel';
import RecommendedProducts from '../components/landing-exclusive/rcmProducts/RecommendP';
import Contact from '../components/landing-exclusive/contact/Contact';
import ChatBot from '../components/chatbot/ChatBot';
import CompraBtn from '../components/landing-exclusive/compraBtn/CompraBtn';
import MostVendidos from '../components/landing-exclusive/mostVendidos/MostVendidos';

//Contextos
import { useUser } from '../context/userContext';

// Componente Principal de Landing Page
function LandingPage() {
  const { user, showLogoutToast, setShowLogoutToast } = useUser();

  useEffect(() => {
    if (showLogoutToast) {
      toast.info('Su sesión ha sido cerrada exitosamente, por favor vuelva a iniciar sesión', {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setShowLogoutToast(false); // Resetear el estado después de mostrar el toast
    }
  }, [showLogoutToast, setShowLogoutToast]);

  return (
    <>
      <ChatBot />
      <CarouselSection />
      <CompraBtn />
      {user && <RecommendedProducts />}
      <MostVendidos />
      <Contact />
    </>
  );
}

export default LandingPage;
