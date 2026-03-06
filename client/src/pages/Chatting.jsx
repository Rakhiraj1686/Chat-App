import React , {useState} from 'react'
import QuickNevigation from "../components/chats/QuickNevigation"
import ContactBar from "../components/chats/ContactBar"
import ChatWindow from '../components/chats/ChatWindow'
import ProfilePage from '../components/chats/Profile'
import Settings from '../components/chats/Settings'

const Chatting = () => {

 const [fetchMode, setFetchMode] = useState("RC");
 const [receiver, setReceiver] = useState(null);

 const [activePage, setActivePage] = useState("contacts"); 
 // contacts | profile

  return (
    <>
      <div className='flex h-[91vh] '>

       {/* ICON BAR */}
       <div className="w-1/20 border-r-2 border-gray-300 overflow-hidden flex flex-col">
          <QuickNevigation
            setFetchMode={setFetchMode}
            setActivePage={setActivePage}
          />
        </div>


        {/* CONTACT OR PROFILE */}
        <div className="w-5/20 border-r-2 border-gray-300 overflow-hidden ">

          {activePage === "contacts" && (
            <ContactBar
              fetchMode={fetchMode}
              setReceiver={setReceiver}
            />
          )}

          {activePage === "profile" && (
            <ProfilePage setActivePage={setActivePage}/>
          )}

          {activePage === "settings" && (
            <Settings setActivePage={setActivePage} />
          )}

        </div>


        {/* CHAT WINDOW */}
        <div className="w-14/20 border-r-2 border-gray-300 overflow-hidden">
          <ChatWindow receiver={receiver} />
        </div>

      </div>
    </>
  )
}

export default Chatting