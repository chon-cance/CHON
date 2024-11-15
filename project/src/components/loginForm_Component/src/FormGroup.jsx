import "./App.css";

const FormGroup = ({ label, type, placeholder }) => {
  return (
    <div className="form-group">
      <label className="NameFont">{label}</label>
      <input className="textBoxText" type={type} placeholder={placeholder} />
    </div>
  );
};

export default FormGroup;
