import { FiChevronUp } from "react-icons/fi";

export const Footer = () => {
  return (
    <>
      <footer className=" bg-black text-center text-white fixed right-0 bottom-0 left-0 w-full h-auto m-0 p-0 md:h-[45px] lg:h-[55px] custom-xl:h-[45px]">
        <p className="p-[10px] text-[18px] xs:text-[0.90em] md:text-[1.1em] lg:text-[1.3em] custom-xl:text-[1.2em]">
          Designed and Created by{""}{" "}
          <a
            href="https://kodunity.xyz"
            className="hover:bg-[#d50000] hover:py-[3px] px-[5px] rounded-[5px]"
          >
            Kodunity
          </a>
        </p>
        <button
          className="rounded-full bg-[#240b36] text-white flex justify-center items-center cursor-pointer fixed top-[90%] left-[90%] hover:bg-[#d50000] xs:top-[96.2%] xs:text-[1.2em] sm:text-[1.4em] sm:top-[95.8%] md:top-[96%] md:left-[92%] lg:top-[95.6%] lg:left-[88%] lg:text-[1.5em] xl:top-[95.4%] custom-sm:top-[95.5%] custom-md:top-[95.4%]
        custom-xl:top-[95%] xxl:top-[95.4%] xxl:left-[88%]"
        >
          <a href="#">
            <FiChevronUp />
          </a>
        </button>
      </footer>
    </>
  );
};
