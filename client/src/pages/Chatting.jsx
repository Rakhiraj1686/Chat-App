import React , {useState} from 'react'
import QuickNevigation from "../components/chats/QuickNevigation"
import ContactBar from "../components/chats/ContactBar";
import ChatWindow from "../components/chats/chatWindow";

const Chatting = () => {
 const [fetchMode, setFetchMode] = useState("RC");

  const [receiver, setReceiver] = useState(null);


  return (
    <>
      <div className='flex h-[92vh]'>
       <div className="w-1/20 border-r-2 border-gray-300 overflow-hidden">
          <QuickNevigation setFetchMode={setFetchMode} />
        </div>
        <div className="w-4/20 border-r-2 border-gray-300 overflow-hidden">
          <ContactBar fetchMode={fetchMode} setReceiver={setReceiver} />
        </div>
        <div className="w-15/20 border-r-2 border-gray-300 overflow-hidden">
          <ChatWindow receiver={receiver} />
        </div>
      </div>
    </>
  )
}

export default Chatting