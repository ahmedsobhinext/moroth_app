// pages/arview.js
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const CubePanorama = dynamic(() => import('../components/CubePanorama'), { ssr: false });

export default function ARViewPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (router.isReady && (id === 'Pq5fYUGTc1aVfplzNc83')) {
      // Open in new tab
    const newWindow = window.open(
      'https://my.matterport.com/show/?m=9NtjAHfSmVJ', 
      '_blank',
      'noopener,noreferrer'
    );
    
    // Security best practice for new windows
    if (newWindow) newWindow.opener = null;
    }
  }, [router.isReady, id]);

  if (!router.isReady || (id && (id === 'Pq5fYUGTc1aVfplzNc83'))) {
    return null; // Return null while checking or during redirect
  }

  return <CubePanorama id={id} />;
}