import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import EditorCommon from "./EdittorCommon/EdittorCommon";
import { InputNumber } from "antd";

const FormControl = ({ name, type, label, children, inputType, ...other }) => {
  const { values, submitForm, errors, handleChange, setFieldValue } =
    useFormikContext();

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

  if (type === "editor") {
    return (
      <div className="mb-3">
        <label className="col-form-label">{label}</label>
        <EditorCommon name={name}></EditorCommon>
        {errors[name] && <div className="feedback">{errors[name]}</div>}
      </div>
    );
  }

  if (type === "input_number") {
    const handleInputChange = (value) => {
      setFieldValue(name, value);
    };
    return (
      <div className="mb-3">
        <label className="col-form-label">{label}</label>
        <InputNumber
          type="number"
          style={{ width: "100%", padding: "10px" }}
          onChange={handleInputChange}
          value={values[name] || 0}
          prefix={<span style={{ textDecoration: "underline" }}>+84</span>}
          {...other}
        />
        {errors[name] && <div className="feedback">{errors[name]}</div>}
      </div>
    );
  }

  if (!!children) {
    return (
      <>
        <label className="col-form-label">{label}</label>
        {addPropsToChildren(children, {
          onChange: handleChange,
          name: name,
          value: values[name] || "",
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
          name={name}
          className="form-control"
          type={inputType || "text"}
          value={!!values[name] ? values[name] : ""}
        />
      )}
      {errors[name] && <div className="feedback">{errors[name]}</div>}
    </>
  );
};

FormControl.defaultProps = {
  type: "input",
  inputType: "text",
};

export default FormControl;
