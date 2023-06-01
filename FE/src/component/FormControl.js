import { useFormikContext } from "formik";
import React from "react";

const FormControl = ({ name, type, label, children, ...other }) => {
  const { values, submitForm, errors, handleChange } = useFormikContext();

  function addPropsToReactElement(element, propsChildren) {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, propsChildren);
    }
    return element;
  }

  function addPropsToChildren(element, propsChildren) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children, propsChildren);
    }
    return children.map((childElement) =>
      addPropsToReactElement(childElement, propsChildren)
    );
  }

  if (!!children) {
    return (
      <>
        <label className="col-form-label">{label}</label>
        {addPropsToChildren(children, {
          onChange: handleChange,
          name: name,
          ...other,
        })}
        {errors[name] && <div className="feedback">{errors[name]}</div>}
      </>
    );
  }
  return (
    <>
      <label className="col-form-label">{label}</label>
      {type === "input" && (
        <input
          style={{ height: "56px" }}
          onChange={handleChange}
          name="name"
          className="form-control"
          type="text"
          defaultValue=""
        />
      )}
      {errors[name] && <div className="feedback">{errors[name]}</div>}
    </>
  );
};

FormControl.defaultProps = {
  type: "input",
};

export default FormControl;
