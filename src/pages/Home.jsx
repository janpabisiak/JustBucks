import BackgroundContainer from '../components/Home/BackgroundContainer';
import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import FAQ from '../components/Home/FAQ';
import Contact from '../components/Home/Contact';
import Footer from '../components/Home/Footer';

export default function Homepage() {
	return (
		<>
			<BackgroundContainer>
				<Header />
				<Hero />
			</BackgroundContainer>
			<Features />
			<FAQ />
			<Contact />
			<Footer />
		</>
	);
}
