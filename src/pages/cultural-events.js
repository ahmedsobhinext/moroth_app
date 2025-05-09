import Head from 'next/head';

import GridItem from './components/GridItem';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Header from './components/Header';
import NavMenu from './components/NavMenu';
import ItemsGrid from './components/ItemsGrid';
import BannerImage from './components/BannerImage'; 
import CulturalEventsGrid from './components/CulturalEventsGrid';

export default function CulturalEvents() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
    <main className="container mx-auto px-4 py-8 flex-grow">
      {/* Header Section */}
      <header className="text-center mb-12">
        <Header />
        
       
      </header>

      {/* Main Grid */}
      <div className="font-IBMPlexSansArabic grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
      <GridItem
          linkTo="cultural-events"
            title="الفعاليات الثقافية"
            description=""
          />
          <GridItem
                    linkTo="popular-dishes"

            title="الأكلات الشعبية"
            description=""
          />
          <GridItem
                    linkTo="clothing"

            title="الأزياء"
            description=""
          />
          <GridItem
                    linkTo="heritage-places"

            title="الأماكن التراثية"
            description=""
          />
      </div>

      {/* <HeroSection /> */}
      <CulturalEventsGrid />

      {/* Secondary Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <GridItem
          title="الفعاليات الثقافية"
          description="ملاحم عرفيه وحاضر برقم"
        />
        <GridItem
          title="الأكالت الشعبية"
          description="ملاحم عرفيه وحاضر برقم"
        />
      </div> */}
    </main>

    <Footer />
  </div>
  );
}