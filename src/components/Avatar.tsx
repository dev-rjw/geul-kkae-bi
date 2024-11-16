import Image from 'next/image';

type Props = {
  src: string | null | undefined;
  size: string | undefined;
  className?: string;
  sizes?: string | undefined;
  style?: React.CSSProperties;
};

const Avatar = ({ src, size, className, style }: Props) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-primary-100 bg-cover ${className}`}
      style={style}
    >
      <Image
        src={src ?? '/image_placeholder.webp'}
        alt='Profile'
        quality={85}
        fill
        sizes={size}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
};

export default Avatar;
