interface IButtonsSectionProps {
  onLoadPhoto: () => void;
}
function ButtonsSection(props: IButtonsSectionProps) {
  return (
    <section className="hero is-flex is-flex-direction-row is-justify-content-flex-end is-flex-wrap-nowrap btn-section">
      <button className="button is-warning m-1" onClick={props.onLoadPhoto}>
        Charger une photo
      </button>
    </section>
  );
}
export default ButtonsSection;
