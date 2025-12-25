import "tailwindcss";
import Navbar from "./components/Navbar";
import { FaSearch } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import UseDisclose from "./Hook/UseDisclose";
import NotFoundContact from "./components/NotFoundContact";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [Contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = UseDisclose();

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactRef = collection(db, "Contact");
        onSnapshot(contactRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContact();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "Contact");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact)=>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-h-100vh m-auto max-w-370px">
        <Navbar />
        <div className="flex gap-2 items-center">
          <FaSearch className="text-white absolute ml-2" />
          <input
            onChange={filterContact}
            placeholder="Enter to search"
            type="text"
            className=" pl-8 h-10 grow border border-white  outline-none text-white bg-transparent rounded-2xl"
          />
          <FaPlusCircle onClick={onOpen} className=" text-white text-2xl" />
        </div>
        <div className="">
          {Contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            Contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default App;
