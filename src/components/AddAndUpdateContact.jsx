import { Field, Formik, Form, ErrorMessage } from "formik";
import Model from "./Model";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify"
import { db } from "../config/firebase";
import * as Yup from "yup"

const contactValidationSchema= Yup.object().shape({
  name: Yup.string().required("Name is to be given"),
  email: Yup.string().email("invalid email").required("Email is to be given")
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contact");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact added sucessfully");
    } catch (error) {
      console.error(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contact", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    } catch (e) {
      console.error(e);
      
    }
  };
  return (
    <>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactValidationSchema}
          initialValues={isUpdate ? {
            name:  contact.name,
            email: contact.email
          } : {
            name: "",
            email: ""
          }}
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form autoComplete="form" className="flex flex-col gap-4 m-3">
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="name">
                Name
              </label>
              <Field
                name="name" // Added name prop
                className="border rounded-sm h-9"
                id="name"
                type="name"
              />
              <div className="text-sm text-red-600">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold" htmlFor="email">
                Email
              </label>
              <Field
                name="email" // Added name prop
                className="border rounded-sm h-9"
                id="email" // Fixed casing to match htmlFor
                type="email"
              />
              <div className="text-sm text-red-600
              ">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button
              type="submit" // Changed from type="button" to type="submit"
              className="border self-end rounded-sm cursor-pointer bg-amber-400 mb-2 px-3 py-1.5"
            >
              {isUpdate ? "update" : "add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
      
    </>
  );
};

export default AddAndUpdateContact;
