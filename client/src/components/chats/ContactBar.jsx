import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Search } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";

/* ---------------- Recent Contacts ---------------- */

const DummyRecentContact = [
  { id: 1, name: "Amit Sharma", email: "amit.sharma@example.com", contactNumber: "9876543210" },
  { id: 2, name: "Priya Verma", email: "priya.verma@example.com", contactNumber: "9876501234" },
  { id: 3, name: "Rahul Singh", email: "rahul.singh@example.com", contactNumber: "9123456780" },
  { id: 4, name: "Sneha Gupta", email: "sneha.gupta@example.com", contactNumber: "9988776655" },
  { id: 5, name: "Vikram Patel", email: "vikram.patel@example.com", contactNumber: "9898989898" },
  { id: 6, name: "Neha Joshi", email: "neha.joshi@example.com", contactNumber: "9812345678" },
  { id: 7, name: "Arjun Mehta", email: "arjun.mehta@example.com", contactNumber: "9001122334" },
  { id: 8, name: "Kavita Nair", email: "kavita.nair@example.com", contactNumber: "9012345678" },
  { id: 9, name: "Rohit Agarwal", email: "rohit.agarwal@example.com", contactNumber: "9090909090" },
  { id: 10, name: "Pooja Kapoor", email: "pooja.kapoor@example.com", contactNumber: "9887766554" },
];

/* ---------------- All Contacts ---------------- */

const DummyAllContact = [
  { id: 11, name: "Ankit Tiwari", email: "ankit.tiwari@example.com", contactNumber: "9876012345" },
  { id: 12, name: "Ritika Saxena", email: "ritika.saxena@example.com", contactNumber: "9811122233" },
  { id: 13, name: "Manish Yadav", email: "manish.yadav@example.com", contactNumber: "9822334455" },
  { id: 14, name: "Deepak Choudhary", email: "deepak.choudhary@example.com", contactNumber: "9833445566" },
  { id: 15, name: "Shalini Mishra", email: "shalini.mishra@example.com", contactNumber: "9844556677" },
  { id: 16, name: "Karan Malhotra", email: "karan.malhotra@example.com", contactNumber: "9855667788" },
  { id: 17, name: "Nisha Arora", email: "nisha.arora@example.com", contactNumber: "9866778899" },
  { id: 18, name: "Sandeep Kulkarni", email: "sandeep.kulkarni@example.com", contactNumber: "9877889900" },
  { id: 19, name: "Pankaj Bansal", email: "pankaj.bansal@example.com", contactNumber: "9888990011" },
  { id: 20, name: "Aarti Deshmukh", email: "aarti.deshmukh@example.com", contactNumber: "9899001122" },
  { id: 21, name: "Varun Khanna", email: "varun.khanna@example.com", contactNumber: "9900112233" },
  { id: 22, name: "Megha Sinha", email: "megha.sinha@example.com", contactNumber: "9911223344" },
  { id: 23, name: "Tarun Bhatt", email: "tarun.bhatt@example.com", contactNumber: "9922334455" },
  { id: 24, name: "Komal Jain", email: "komal.jain@example.com", contactNumber: "9933445566" },
  { id: 25, name: "Rakesh Pawar", email: "rakesh.pawar@example.com", contactNumber: "9944556677" },
  { id: 26, name: "Divya Nanda", email: "divya.nanda@example.com", contactNumber: "9955667788" },
  { id: 27, name: "Saurabh Gupta", email: "saurabh.gupta@example.com", contactNumber: "9966778899" },
  { id: 28, name: "Isha Kapoor", email: "isha.kapoor@example.com", contactNumber: "9977889900" },
  { id: 29, name: "Aditya Srivastava", email: "aditya.srivastava@example.com", contactNumber: "9988990011" },
  { id: 30, name: "Ritu Pandey", email: "ritu.pandey@example.com", contactNumber: "9999001122" },
];

const ContactBar = ({ fetchMode, setReceiver }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const headerTitle = fetchMode === "RC" ? "Recent Chats" : "All Contacts";

  const fetchContacts = () => {
    setLoading(true);

    try {
      setTimeout(() => {
        if (fetchMode === "RC") {
          setContacts(DummyRecentContact);
        } else if (fetchMode === "AC") {
          setContacts(DummyAllContact);
        } else {
          setContacts([]);
        }

        setLoading(false);
      }, 600);
    } catch (error) {
      toast.error("Failed to load contacts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchMode]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-sm opacity-60">Loading contacts...</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-base-200 border-r">

      {/* Header */}
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg tracking-wide">
          {headerTitle}
        </h2>

        <BsThreeDotsVertical className="cursor-pointer text-gray-900 opacity-70 hover:opacity-100"/>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="flex items-center gap-2 bg-base-100 border rounded-xl px-3 py-2">
          <Search size={18} className="opacity-60" />

          <input
            type="text"
            placeholder="Search contacts"
            className="bg-transparent outline-none w-full text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">

        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setReceiver(contact)}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-base-300 transition"
          >

            {/* Avatar */}
            <div className="relative">

              <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {contact.name.charAt(0)}
              </div>

              {/* Online Dot (optional) */}
              {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-200 rounded-full"></span> */}

            </div>

            {/* Name */}
            <div className="flex flex-col">
              <span className="font-medium text-sm">
                {contact.name}
              </span>

              <span className="text-xs opacity-60">
                Tap to chat
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ContactBar;