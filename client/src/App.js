import { useState } from "react";
import ChatSpace from "./components/ChatSpace";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  //State to hold the Upload-File name
  const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <div>
      <Navbar setUploadedFile={setUploadedFile} />
      <ChatSpace uploadedFile={uploadedFile} />
      <Toaster />
    </div>
  );
}

export default App;
