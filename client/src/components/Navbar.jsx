import { FiPlusCircle } from "react-icons/fi";
import pdf from "../assets/svg/pdf.svg";
import logo from "../assets/svg/logo.svg";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = ({ setUploadedFile }) => {
  //State to manage PDF name
  const [pdfName, setPdfName] = useState("");

  // Function to handle file upload
  const handleUpload = async (e) => {
    // Get the uploaded file
    const file = e.target.files[0];

    //Check if file is pdf
    const isValidPdf = file.name.toLowerCase().endsWith(".pdf");
    if (!isValidPdf) {
      toast.error("Only PDF files accepted");
      return;
    }

    // Send file to server for upload
    const formData = new FormData();
    formData.append("file", file);
    const uploadPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) reject();
      else {
        resolve();
        const data = await res.json();
        setPdfName(data.filename);
        setUploadedFile(data.filename);
      }
    });

    // Display toast notification for upload process
    toast.promise(uploadPromise, {
      loading: "Uploading PDF",
      success: "Uploaded!",
      error: "Error",
    });
  };

  return (
    <nav className="max-xl:h-[71px] h-[77px] w-full shadow-drop flex items-center justify-between px-14">
      {/* Main Logo */}
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="flex items-center gap-7">
        {/* Conditionally Rendering Uploaded PDF name */}
        <div className="flex items-center gap-2">
          {pdfName && (
            <>
              <img
                src={pdf}
                alt="logo"
                className="border border-green-200 p-1"
              />
              <span className="text-sm text-green-600">{pdfName}</span>
            </>
          )}
        </div>
        {/* Upload Button */}
        <label
          htmlFor="file-upload"
          className="md:px-7 px-2 py-2 border border-black rounded-md font-semibold text-sm flex items-center gap-2 cursor-pointer"
        >
          <FiPlusCircle size={20} />
          <span className="hidden md:block">Upload PDF</span>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => handleUpload(e)}
          />
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
