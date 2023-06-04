import React from "react";
import FormControl from "../../component/FormControl";
import { InputNumber, Switch } from "antd";

const CourseTab4 = () => {
  const onChange = () => {};
  return (
    <div>
      <div className="widget-inner">
        {/* <form className={"edit-profile m-b30"} onSubmit={handleSubmit}> */}
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>Price</h3>
            </div>
          </div>
          <div className="col-12 mt-3">
            <label className="col-form-label me-5">Free :</label>

            <Switch defaultChecked onChange={onChange} />
            <div className="col-6 mt-3">
              <FormControl name="price" label={"Regular Price*"}>
                <InputNumber
                  type="number"
                  prefix="VND"
                  style={{ width: "100%", padding: "10px" }}
                />
              </FormControl>
            </div>
            <div className="col-6 mt-3">
              <FormControl name="discount" label={"Discount Price*"}>
                <InputNumber
                  type="number"
                  prefix="VND"
                  style={{ width: "100%", padding: "10px" }}
                />
              </FormControl>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default CourseTab4;
