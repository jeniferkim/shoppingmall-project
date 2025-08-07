export default function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required />
    </div>
  );
}