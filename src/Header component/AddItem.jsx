import Styles from "./AddItem.module.css";
import Spinner from "../Main component/Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemsContext } from "../Context/ItemsContext";
import { itemSchema } from "../Validations/ItemsValidation";
import {Field, Formik , Form , ErrorMessage} from "formik"

const AddItem = () => {
  const {loading , createItems , groups} = useContext(ItemsContext)
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Formik 
        initialValues={{
          fullname : "",
          photo : "",
          model: "",
          desc : "",
          cost : "",
          group: ""
        }}
        validationSchema={itemSchema}
        onSubmit={(values)=>{
          createItems(values)
        }}
        >
        <Form>
          <div className={Styles.AddItemContainer}>
            <table>
              <tr>
                <Field
                  type="text"
                  placeholder="name"
                  name="fullname"
                  className={`${Styles.AddItemInputs} , ${Styles.AddItemName}`}
                />
              </tr>
              <ErrorMessage name="fullname" >{msg => <div className={Styles.ErrorMessage}>{msg}</div>}</ErrorMessage>
              <tr>
                <Field
                  type="text"
                  name="photo"
                  placeholder="image address"
                  className={`${Styles.AddItemInputs}`}
                />
              </tr>
              <ErrorMessage name="photo" >{msg => <div className={Styles.ErrorMessage}>{msg}</div>}</ErrorMessage>
              <tr>
                <Field
                  type="text"
                  placeholder="model"
                  name="model"
                  className={`${Styles.AddItemInputs}`}
                />
              </tr>
              <ErrorMessage name="model" >{msg => <div className={Styles.ErrorMessage}>{msg}</div>}</ErrorMessage>
              <tr>
                <Field
                  type="text"
                  name="const"
                  placeholder="cost"
                  className={`${Styles.AddItemInputs} , ${Styles.AddItemCost}`}
                />
              </tr>
              <ErrorMessage name="cost" >{msg => <div className={Styles.ErrorMessage}>{msg}</div>}</ErrorMessage>
              <tr>
                <Field
                  name="desc"
                  placeholder="description"
                  className={Styles.AddItemDesc}
                />
              </tr>
              <ErrorMessage name="desc" >{msg => <div className={Styles.ErrorMessage}>{msg}</div>}</ErrorMessage>

              <tr>
                {/*to do: fix the choose group */}
                <Field
                  name="group"
                  as="select"
                  className={`${Styles.AddItemInputs}`} 
                >
                  {" "}
                  <option value="group">Choose groups</option>
                  {groups.length > 0 &&
                  groups.map((group) => {
                    <select>
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>;
                      </select>
                    })}
                </Field>
              </tr>
              <ErrorMessage name="group">{msg =><div className={Styles.ErrorMessage}>{msg}</div>}</ErrorMessage>
              <tr>
                <input
                  type="submit"
                  value="Submit"
                  className={Styles.AddItemSubmit}
                />{" "}
                <Link to="/Items">
                  <button className={Styles.AddItemCancelBtn}>cancel</button>
                </Link>
              </tr>
            </table>
          </div>
        </Form>
        </Formik>
      )}
    </>
  );
};
export default AddItem;
