interface ImageDisplayProps {
  base64Image?: string;
}
export default function ImageDisplay({ base64Image }: ImageDisplayProps) {
  if (!base64Image) {
    return <div id="terminaali-page">Kuvaa ei löytynyt</div>;
  }

  const imageUrl = `data:image/jpeg;base64,${base64Image}`;
  return <img id="terminaali-page" src={imageUrl} />;
}
