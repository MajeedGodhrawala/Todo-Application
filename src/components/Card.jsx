export default function Card({ extraClass, children, title }) {
  return (
    <>
      <div className={`shadow-sm mb-3 bg-body-tertiary rounded ${extraClass}`}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="card-text">{children}</div>
        </div>
      </div>
    </>
  );
}
