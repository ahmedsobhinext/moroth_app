import Link from 'next/link';


const GridItem = ({ title, description,linkTo }) => (
  <Link href={`/${linkTo}`}>
    <div className="p-6 bg-amber-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-bold text-amber-900 mb-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
    </Link>
  );
  
  export default GridItem;