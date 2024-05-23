export default function Button({
  onClick,
  className = "btn btn-primary",
  children,
}) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
