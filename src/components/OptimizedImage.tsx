import Image from "next/image";

type OptimizedImageProps = {
  src: string; // path without extension (e.g. "/images/kyoto")
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <Image
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/fallback.jpg";
        }}
      />
    </picture>
  );
}
