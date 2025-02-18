const HeroSection = () => (
    <div className="my-12 text-center">
      <h2 className="text-4xl font-bold text-amber-900 mb-8">
        يا الله حيّته !
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-amber-100 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">الأزياء</h3>
        </div>
        <div className="bg-amber-100 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">الأماكن التراثية</h3>
        </div>
      </div>
    </div>
  );
  
  export default HeroSection;