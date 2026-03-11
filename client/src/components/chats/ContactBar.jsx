import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import socketAPI from "../../config/WebSocket";
import { GoDotFill } from "react-icons/go";

const DummyRecentContact = [
  {
    id: 1,
    fullName: "Amit Sharma",
    email: "amit.sharma@example.com",
    mobileNumber: "9876543210",
  },
  {
    id: 2,
    fullName: "Priya Verma",
    email: "priya.verma@example.com",
    mobileNumber: "9876501234",
  },
  {
    id: 3,
    fullName: "Rahul Singh",
    email: "rahul.singh@example.com",
    mobileNumber: "9123456780",
  },
  {
    id: 4,
    fullName: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    mobileNumber: "9988776655",
  },
  {
    id: 5,
    fullName: "Vikram Patel",
    email: "vikram.patel@example.com",
    mobileNumber: "9898989898",
  },
  {
    id: 6,
    fullName: "Neha Joshi",
    email: "neha.joshi@example.com",
    mobileNumber: "9812345678",
  },
  {
    id: 7,
    fullName: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    mobileNumber: "9001122334",
  },
  {
    id: 8,
    fullName: "Kavita Nair",
    email: "kavita.nair@example.com",
    mobileNumber: "9012345678",
  },
  {
    id: 9,
    fullName: "Rohit Agarwal",
    email: "rohit.agarwal@example.com",
    mobileNumber: "9090909090",
  },
  {
    id: 10,
    fullName: "Pooja Kapoor",
    email: "pooja.kapoor@example.com",
    mobileNumber: "9887766554",
  },
];

const DummyAllContact = [
  {
    id: 11,
    fullName: "Ankit Tiwari",
    email: "ankit.tiwari@example.com",
    mobileNumber: "9876012345",
  },
  {
    id: 12,
    fullName: "Ritika Saxena",
    email: "ritika.saxena@example.com",
    mobileNumber: "9811122233",
  },
  {
    id: 13,
    fullName: "Manish Yadav",
    email: "manish.yadav@example.com",
    mobileNumber: "9822334455",
  },
  {
    id: 14,
    fullName: "Deepak Choudhary",
    email: "deepak.choudhary@example.com",
    mobileNumber: "9833445566",
  },
  {
    id: 15,
    fullName: "Shalini Mishra",
    email: "shalini.mishra@example.com",
    mobileNumber: "9844556677",
  },
  {
    id: 16,
    fullName: "Karan Malhotra",
    email: "karan.malhotra@example.com",
    mobileNumber: "9855667788",
  },
  {
    id: 17,
    fullName: "Nisha Arora",
    email: "nisha.arora@example.com",
    mobileNumber: "9866778899",
  },
  {
    id: 18,
    fullName: "Sandeep Kulkarni",
    email: "sandeep.kulkarni@example.com",
    mobileNumber: "9877889900",
  },
  {
    id: 19,
    fullName: "Pankaj Bansal",
    email: "pankaj.bansal@example.com",
    mobileNumber: "9888990011",
  },
  {
    id: 20,
    fullName: "Aarti Deshmukh",
    email: "aarti.deshmukh@example.com",
    mobileNumber: "9899001122",
  },
  {
    id: 21,
    fullName: "Varun Khanna",
    email: "varun.khanna@example.com",
    mobileNumber: "9900112233",
  },
  {
    id: 22,
    fullName: "Megha Sinha",
    email: "megha.sinha@example.com",
    mobileNumber: "9911223344",
  },
  {
    id: 23,
    fullName: "Tarun Bhatt",
    email: "tarun.bhatt@example.com",
    mobileNumber: "9922334455",
  },
  {
    id: 24,
    fullName: "Komal Jain",
    email: "komal.jain@example.com",
    mobileNumber: "9933445566",
  },
  {
    id: 25,
    fullName: "Rakesh Pawar",
    email: "rakesh.pawar@example.com",
    mobileNumber: "9944556677",
  },
  {
    id: 26,
    fullName: "Divya Nanda",
    email: "divya.nanda@example.com",
    mobileNumber: "9955667788",
  },
  {
    id: 27,
    fullName: "Saurabh Gupta",
    email: "saurabh.gupta@example.com",
    mobileNumber: "9966778899",
  },
  {
    id: 28,
    fullName: "Isha Kapoor",
    email: "isha.kapoor@example.com",
    mobileNumber: "9977889900",
  },
  {
    id: 29,
    fullName: "Aditya Srivastava",
    email: "aditya.srivastava@example.com",
    mobileNumber: "9988990011",
  },
  {
    id: 30,
    fullName: "Ritu Pandey",
    email: "ritu.pandey@example.com",
    mobileNumber: "9999001122",
  },
];

const ContactBar = ({ fetchMode, setReceiver }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState();

  const fetchContacts = async () => {
    // Simulate an API call with a delay
    setLoading(true);
    try {
      let res;
      if (fetchMode === "RC") {
        // console.log("Calling recents");

        setContacts(DummyRecentContact);
      } else if (fetchMode === "AC") {
        //  console.log("Calling All");
        res = await api.get("/user/allUsers");
        setContacts(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate fetching contacts from an API when the component mounts
    fetchContacts();
  }, [fetchMode]);

  const handleOnlineUsers = (onlineList) => {
    console.log(onlineList);

    setOnlineUsers(onlineList);
  };

  useEffect(() => {
    socketAPI.on("onlineUsers", handleOnlineUsers);

    return () => {
      socketAPI.off("onlineUsers", handleOnlineUsers);
    };
  }, [contacts, handleOnlineUsers]);

  if (loading || contacts.length === 0) {
    return (
      <div className="p-2 h-full flex items-center justify-center">
        <span className="text-sm text-primary">Loading contacts...</span>
      </div>
    );
  }

  // console.log(contacts);

  return (
    <>
      <div className="p-2 bg-accent-content h-full flex flex-col gap-2">
        <div className="overflow-y-auto space-y-1">
          {contacts &&
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="p-2 bg-accent hover:bg-primary transition-colors rounded-lg cursor-pointer"
                onClick={() => {
                  setReceiver(contact);
                }}
              >
                <h3 className="font-semibold text-accent-content flex justify-between items-center">
                  {contact.fullName}
                  {onlineUsers && onlineUsers[contact._id] && (
                    <GoDotFill className="text-green-400" />
                  )}
                </h3>
                <p className="text-sm text-accent-content">{contact.email}</p>
                <p className="text-lg font-bold text-accent-content">
                  {contact.mobileNumber}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ContactBar;