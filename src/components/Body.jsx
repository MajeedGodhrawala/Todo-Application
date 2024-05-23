export default function Body({ title, subTitle, cardClass, children }) {
  return (
    <>
      <div className={`card ${cardClass}`}>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h6 className="card-subtitle mb-2 text-body-secondary">{subTitle}</h6>
        </div>
        <div className="card-body">{children}</div>
      </div>
    </>
  );
}
