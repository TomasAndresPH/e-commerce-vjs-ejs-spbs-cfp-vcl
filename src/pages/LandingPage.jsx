import {React} from 'react';

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
  const { user } = useUser();
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
