import Image from "next/image";

type ImagePreviewProps = {
  image: string;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return (
    <Image
      src={image}
      alt="Preview"
      loading="lazy"
      quality={100}
      width={200}
      height={300}
      className="rounded object-contain my-5 w-full md:w-[200px]"
    />
  );
};

export default ImagePreview;
