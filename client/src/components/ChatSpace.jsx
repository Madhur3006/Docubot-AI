import SendImg from "../assets/svg/sendimg.svg";
import userDp from "../assets/svg/user-dp.svg";
import aiDp from "../assets/svg/ai-dp.svg";

const ChatSpace = () => {
  return (
    <section className="max-w-[1450px] w-full mx-auto h-[calc(100vh-77px)] pt-20 pb-10 relative max-2xl:px-[32px] flex flex-col justify-between">
      <div className="w-full h-[75vh] overflow-y-scroll scrollbar-hidden flex flex-col max-xl:gap-10 gap-20">
        <div className="flex items-start gap-6">
          <img src={userDp} alt="" />
          <div>explain like im 5</div>
        </div>
        <div className="flex items-start gap-6">
          <img src={aiDp} alt="" />
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            perspiciatis earum dicta suscipit. Laboriosam eaque a repellat
            ducimus quod provident saepe, ipsa odit voluptas voluptatem maxime
            earum. Suscipit, accusantium! Fugit vitae velit, fuga rem aperiam
            modi consequuntur consequatur provident nam eius facilis saepe qui
            atque minus ipsa amet voluptatum? Ullam consequuntur suscipit
            officiis blanditiis necessitatibus est illo tempore facere
            repellendus numquam aperiam veniam sit natus laborum, voluptate
            neque repudiandae, earum dolorem incidunt modi cum. Repellat nam
            aliquam autem, repudiandae ad quo incidunt non laboriosam eaque ut
            eveniet reiciendis, possimus quidem natus laborum accusantium
            laudantium porro doloribus animi tempore soluta officiis?
          </div>
        </div>
      </div>
      <div className="w-full z-[100] px-10 bottom-10 flex items-center justify-between border-2 border-[#E4E8EE] shadow-drop-input rounded-md">
        <input
          type="text"
          className="w-[95%] max-xl:py-2 py-3 outline-none"
          placeholder="Send a message..."
        />
        <img src={SendImg} alt="send" className="cursor-pointer" />
      </div>
    </section>
  );
};

export default ChatSpace;
