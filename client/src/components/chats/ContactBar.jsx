import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Search } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import api from "../../config/api";

/* ---------------- Recent Contacts ---------------- */

const DummyRecentContact = [
  {
    _id: "rc-1",
    fullName: "Amit Sharma",
    email: "amit.sharma@example.com",
    mobileNumber: "9876543210",
  },
  {
    _id: "rc-2",
    fullName: "Priya Verma",
    email: "priya.verma@example.com",
    mobileNumber: "9876501234",
  },
  {
    _id: "rc-3",
    fullName: "Rahul Singh",
    email: "rahul.singh@example.com",
    mobileNumber: "9123456780",
  },
  {
    _id: "rc-4",
    fullName: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    mobileNumber: "9988776655",
  },
  {
    _id: "rc-5",
    fullName: "Vikram Patel",
    email: "vikram.patel@example.com",
    mobileNumber: "9898989898",
  },
  {
    _id: "rc-6",
    fullName: "Neha Joshi",
    email: "neha.joshi@example.com",
    mobileNumber: "9812345678",
  },
  {
    _id: "rc-7",
    fullName: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    mobileNumber: "9001122334",
  },
  {
    _id: "rc-8",
    fullName: "Kavita Nair",
    email: "kavita.nair@example.com",
    mobileNumber: "9012345678",
  },
  {
    _id: "rc-9",
    fullName: "Rohit Agarwal",
    email: "rohit.agarwal@example.com",
    mobileNumber: "9090909090",
  },
  {
    _id: "rc-10",
    fullName: "Pooja Kapoor",
    email: "pooja.kapoor@example.com",
    mobileNumber: "9887766554",
  },
];

/* ---------------- All Contacts ---------------- */

// const DummyAllContact = [
//   {
//     id: 11,
//     name: "Ankit Tiwari",
//     email: "ankit.tiwari@example.com",
//     contactNumber: "9876012345",
//   },
//   {
//     id: 12,
//     name: "Ritika Saxena",
//     email: "ritika.saxena@example.com",
//     contactNumber: "9811122233",
//   },
//   {
//     id: 13,
//     name: "Manish Yadav",
//     email: "manish.yadav@example.com",
//     contactNumber: "9822334455",
//   },
//   {
//     id: 14,
//     name: "Deepak Choudhary",
//     email: "deepak.choudhary@example.com",
//     contactNumber: "9833445566",
//   },
//   {
//     id: 15,
//     name: "Shalini Mishra",
//     email: "shalini.mishra@example.com",
//     contactNumber: "9844556677",
//   },
//   {
//     id: 16,
//     name: "Karan Malhotra",
//     email: "karan.malhotra@example.com",
//     contactNumber: "9855667788",
//   },
//   {
//     id: 17,
//     name: "Nisha Arora",
//     email: "nisha.arora@example.com",
//     contactNumber: "9866778899",
//   },
//   {
//     id: 18,
//     name: "Sandeep Kulkarni",
//     email: "sandeep.kulkarni@example.com",
//     contactNumber: "9877889900",
//   },
//   {
//     id: 19,
//     name: "Pankaj Bansal",
//     email: "pankaj.bansal@example.com",
//     contactNumber: "9888990011",
//   },
//   {
//     id: 20,
//     name: "Aarti Deshmukh",
//     email: "aarti.deshmukh@example.com",
//     contactNumber: "9899001122",
//   },
//   {
//     id: 21,
//     name: "Varun Khanna",
//     email: "varun.khanna@example.com",
//     contactNumber: "9900112233",
//   },
//   {
//     id: 22,
//     name: "Megha Sinha",
//     email: "megha.sinha@example.com",
//     contactNumber: "9911223344",
//   },
//   {
//     id: 23,
//     name: "Tarun Bhatt",
//     email: "tarun.bhatt@example.com",
//     contactNumber: "9922334455",
//   },
//   {
//     id: 24,
//     name: "Komal Jain",
//     email: "komal.jain@example.com",
//     contactNumber: "9933445566",
//   },
//   {
//     id: 25,
//     name: "Rakesh Pawar",
//     email: "rakesh.pawar@example.com",
//     contactNumber: "9944556677",
//   },
//   {
//     id: 26,
//     name: "Divya Nanda",
//     email: "divya.nanda@example.com",
//     contactNumber: "9955667788",
//   },
//   {
//     id: 27,
//     name: "Saurabh Gupta",
//     email: "saurabh.gupta@example.com",
//     contactNumber: "9966778899",
//   },
//   {
//     id: 28,
//     name: "Isha Kapoor",
//     email: "isha.kapoor@example.com",
//     contactNumber: "9977889900",
//   },
//   {
//     id: 29,
//     name: "Aditya Srivastava",
//     email: "aditya.srivastava@example.com",
//     contactNumber: "9988990011",
//   },
//   {
//     id: 30,
//     name: "Ritu Pandey",
//     email: "ritu.pandey@example.com",
//     contactNumber: "9999001122",
//   },
// ];

const ContactBar = ({ fetchMode, setReceiver }) => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const headerTitle = fetchMode === "RC" ? "Recent Chats" : "All Contacts";

  const normalizeContact = (contact, index = 0) => ({
    ...contact,
    _id: contact._id || contact.id || `contact-${index}`,
    fullName: contact.fullName || contact.name || "Unknown User",
    mobileNumber: contact.mobileNumber || contact.contactNumber || "",
  });

  const fetchContacts = async () => {
    setLoading(true);
    try {
      if (fetchMode === "RC") {
        setContacts(DummyRecentContact.map((contact, index) => normalizeContact(contact, index)));
      } else if (fetchMode === "AC") {
        const res = await api.get("/user/allUsers");
        setContacts((res.data.data || []).map((contact, index) => normalizeContact(contact, index)));
      } else {
        setContacts([]);
      }
    } catch (error) {
      toast.error("Failed to load contacts. Please try again.");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchMode]);

  const filteredContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">Loading contacts...</span>
      </div>
    );
  }

  if (!contacts.length) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">No contacts found.</span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-base-200 border-r">
      {/* Header */}
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg tracking-wide">{headerTitle}</h2>

        <BsThreeDotsVertical className="cursor-pointer text-gray-900 opacity-70 hover:opacity-100" />
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
            key={contact._id}
            onClick={() => setReceiver(contact)}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-base-300 transition"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                {contact.fullName.charAt(0).toUpperCase()}
              </div>

              {/* Online Dot (optional) */}
              {/* <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-200 rounded-full"></span> */}
            </div>

            {/* Name */}
            <div className="flex flex-col">
              <span className="font-medium text-sm">{contact.fullName}</span>

              <span className="text-xs opacity-60">Tap to chat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactBar;
