// components/BannerImage.js
import Image from 'next/image';

export default function BannerImage() {
  return (
    <div className="w-full h-64 md:h-96 relative mb-8"> {/* Added mb-8 for margin-bottom */}
      <Image
        src="/banner-image.png"
        alt="Banner Image"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
}