import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TemplateGrid from './components/TemplateGrid'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'
import SignatureCollection from './components/SignatureCollection'
import ShowcaseSection from './components/ShowcaseSection'
import TestimonialsSection from './components/TestimonialsSection'
import BlushRomancePreview from './templates/blush-romance/Preview'
import BlushRomanceEdit from './templates/blush-romance/Edit'
import NoirElegancePreview from './templates/noir-elegance/Preview'
import NoirEleganceEdit from './templates/noir-elegance/Edit'
import GardenWhisperPreview from './templates/garden-whisper/Preview'
import GardenWhisperEdit from './templates/garden-whisper/Edit'
import RoyalSapphirePreview from './templates/royal-sapphire/Preview'
import RoyalSapphireEdit from './templates/royal-sapphire/Edit'
import IvoryClassicPreview from './templates/ivory-classic/Preview'
import IvoryClassicEdit from './templates/ivory-classic/Edit'
import RosyDawnPreview from './templates/rosy-dawn/Preview'
import RosyDawnEdit from './templates/rosy-dawn/Edit'
import LakePalacePreview from './templates/lake-palace/Preview'
import LakePalaceEdit from './templates/lake-palace/Edit'
import MughalGardenPreview from './templates/mughal-garden/Preview'
import MughalGardenEdit from './templates/mughal-garden/Edit'
import CoastalRoyalePreview from './templates/coastal-royale/Preview'
import CoastalRoyaleEdit from './templates/coastal-royale/Edit'
import DesertDuskPreview from './templates/desert-dusk/Preview'
import DesertDuskEdit from './templates/desert-dusk/Edit'

function HomePage() {
  return (
    <div className="font-body">
      <Navbar />
      <HeroSection />
      <TemplateGrid />
      <SignatureCollection />
      <ShowcaseSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates/blush-romance" element={<BlushRomancePreview />} />
        <Route path="/templates/blush-romance/edit" element={<BlushRomanceEdit />} />
        <Route path="/templates/noir-elegance" element={<NoirElegancePreview />} />
        <Route path="/templates/noir-elegance/edit" element={<NoirEleganceEdit />} />
        <Route path="/templates/garden-whisper" element={<GardenWhisperPreview />} />
        <Route path="/templates/garden-whisper/edit" element={<GardenWhisperEdit />} />
        <Route path="/templates/royal-sapphire" element={<RoyalSapphirePreview />} />
        <Route path="/templates/royal-sapphire/edit" element={<RoyalSapphireEdit />} />
        <Route path="/templates/ivory-classic" element={<IvoryClassicPreview />} />
        <Route path="/templates/ivory-classic/edit" element={<IvoryClassicEdit />} />
        <Route path="/templates/rosy-dawn" element={<RosyDawnPreview />} />
        <Route path="/templates/rosy-dawn/edit" element={<RosyDawnEdit />} />
        <Route path="/templates/lake-palace" element={<LakePalacePreview />} />
        <Route path="/templates/lake-palace/edit" element={<LakePalaceEdit />} />
        <Route path="/templates/mughal-garden" element={<MughalGardenPreview />} />
        <Route path="/templates/mughal-garden/edit" element={<MughalGardenEdit />} />
        <Route path="/templates/coastal-royale" element={<CoastalRoyalePreview />} />
        <Route path="/templates/coastal-royale/edit" element={<CoastalRoyaleEdit />} />
        <Route path="/templates/desert-dusk" element={<DesertDuskPreview />} />
        <Route path="/templates/desert-dusk/edit" element={<DesertDuskEdit />} />
      </Routes>
    </BrowserRouter>
  )
}
