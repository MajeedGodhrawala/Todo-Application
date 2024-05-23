export default function Input({
  label,
  type = "text",
  name,
  className = "form-control",
  value,
  onChange,
}) {
  return (
    <>
      <label htmlFor={`${name}_input`} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        id={`${name}_input`}
      />
    </>
  );
}
