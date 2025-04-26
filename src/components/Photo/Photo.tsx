import "./Photo.css";

interface IPhotoProps {
  image: string;
}
const Photo = (props: IPhotoProps) => {
  return (
    <div className="photo-container">
      <img src={props.image} />
    </div>
  );
};

export default Photo;
