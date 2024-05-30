export default function Card({ style, className, children, title }) {
  return (
    <>
      <div style={style} className={className}>
        <div className="card-body">
          {title ? <h5 className="card-title">{title}</h5> : ""}
          <div className="card-text">{children}</div>
        </div>
      </div>
    </>
  );
}
