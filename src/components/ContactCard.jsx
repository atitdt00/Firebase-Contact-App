import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { PiUserCircle } from "react-icons/pi";
import { db } from "../config/firebase";
import UseDisclose from "../Hook/UseDisclose";
import AddAndUpdateContact from "./AddAndUpdateContact";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = UseDisclose();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "Contact", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="my-5  ">
        <div
          key={contact.id}
          className="bg-amber-200 flex items-center justify-between p-2 mb-3 rounded-2xl "
        >
          <PiUserCircle className="text-4xl text-amber-700" />
          <div className="text-2xl text-center">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm ">{contact.email}</p>
          </div>
          <div className="flex items-center gap-2 text-3xl">
            <FaRegEdit
              onClick={onOpen}
              className="cursor-pointer text-amber-500"
            />
            <IoMdTrash
              onClick={() => deleteContact(contact.id)}
              className="text-orange-400 cursor-pointer"
            />
          </div>
          <AddAndUpdateContact
          c
            contact={contact}
            isUpdate
            isOpen={isOpen}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );
};

export default ContactCard;
