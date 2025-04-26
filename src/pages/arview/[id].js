// pages/arview.js
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';


const CubePanorama = dynamic(() => import('../components/CubePanorama'), { ssr: false });

export default function ARViewPage() {
     const router = useRouter();
      const { id } = router.query;
  return <CubePanorama  id={id} />;
}
