import Head from 'next/head';

import GridItem from './components/GridItem';
import Footer from './components/Footer';
import Header from './components/Header';

import DesignsGrid from './components/DesignsGrid';


export default function Clothing() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
    <main className="container mx-auto px-4 py-8 flex-grow">
      {/* Header Section */}
      <header className="text-center mb-12">
        <Header />
        
        {/* Banner Image Section */}
        {/* <BannerImage /> */}

        {/* Title and Description */}
        {/* <h1 className="font-IBMPlexSansArabic text-5xl font-bold text-amber-900 mb-6">
          هُنا حيث الاعتزاز بالهوية السعودية
        </h1>
        <p className="font-IBMPlexSansArabic text-xl text-gray-700 mb-8">
          يقدم موروث تجربة فريدة للاستمتاع برؤية كل ما يخص الثقافة والتراث السعودي. ماضٍ عريق، وحاضر مزهر
        </p> */}
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
      <DesignsGrid />

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