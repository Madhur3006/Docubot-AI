import { FiPlusCircle } from "react-icons/fi";
import pdf from "../assets/svg/pdf.svg";
import logo from "../assets/svg/logo.svg";

const Navbar = () => {
  return (
    <nav className="max-xl:h-[71px] h-[77px] w-full shadow-drop flex items-center justify-between px-14">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-2">
          <img src={pdf} alt="logo" className="border border-green-200 p-1" />
          <span className="text-sm text-green-600">demo.pdf</span>
        </div>
        <button className="md:px-7 px-2 py-2 border border-black rounded-md font-semibold text-sm flex items-center gap-2">
          <FiPlusCircle size={20} />
          <span className="hidden md:block">Upload PDF</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
