/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

const App: React.FC = () => {
  const [selectFile, setSelectFile] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleWindowDrop = (e: DragEvent) => {
      e.preventDefault();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("drop", handleWindowDrop);

    return () => {
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("drop", handleWindowDrop);
    };
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(Array.from(files));
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      setSelectFile((prevFiles) => [...prevFiles, file]);
      selection(file);
    });
  };

  const selection = (file: File) => {
    const contentArea = document.getElementById("content");
    if (contentArea) {
      const fileContainer = document.createElement("article");
      fileContainer.className = "m-2 p-2 border rounded-[5px]";

      if (file.type.startsWith("image")) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.className =
          "w-[100%] h-[500px] xs:h-[100%] sm:h-[100%] md:h-[100%]";
        fileContainer.appendChild(img);
      } else if (file.type.startsWith("video")) {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(file);
        video.controls = true;
        video.className =
          "w-[100%] h-[300px] xs:h-[100%] sm:h-[100%] md:h-[100%]";
        fileContainer.appendChild(video);
      } else if (file.type.startsWith("application/pdf")) {
        const iframe = document.createElement("iframe");
        iframe.src = URL.createObjectURL(file);
        iframe.className =
          "w-[100%] h-[300px] border-none xs:h-[100%] sm:h-[100%] md:h-[100%] lg:h-[100%] xl:h-[100%] custom-xl:h-[100%] xxl:h-[100%]";
        fileContainer.appendChild(iframe);
      } else {
        const error = `${file.name} not found`;
        contentArea.textContent = error;
      }
      contentArea.appendChild(fileContainer);
    }
  };

  const handleBtn = () => {
    fileInputRef.current?.click();
  };

  const clearData = () => {
    const contentArea = document.getElementById("content");
    if (contentArea) {
      contentArea.innerHTML = "";
      contentArea.innerHTML = "Drag & Drop your files here";
    }
    setSelectFile([]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.blur();
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <main className="w-full h-full mt-[50px]">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          multiple
          accept="image/*, video/*, application/pdf"
        />
        <button
          onClick={handleBtn}
          id="fileInput"
          className="bg-[#240b36] hover:bg-[#d50000] p-[10px] text-[#fff] rounded-[5px] w-[110px] h-[30px] flex justify-center mx-auto items-center cursor-pointer focus:outline-none xs:text-[0.90em] md:text-[1.1em] md:w-[115px] md:h-[35px] lg:text-[1.2em] lg:w-[128px] lg:h-[40px] xl:w-[130px] custom-xl:text-[1.2em]"
        >
          Search Files
        </button>

        <button
          onClick={clearData}
          className="bg-[#240b36] hover:bg-[#d50000] p-[10px] text-[#fff] rounded-[5px] w-[110px] h-[30px] flex justify-center my-2 mx-auto items-center cursor-pointer focus:outline-none xs:text-[0.90em] md:text-[1.1em] md:w-[115px] md:h-[35px] lg:text-[1.2em] lg:w-[128px] lg:h-[40px] xl:w-[130px] custom-xl:text-[1.2em]"
        >
          Clear Files
        </button>

        <article className="flex my-[10px] w-[100%] text-center xs:text-[0.90em] md:text-[1.1em] lg:text-[1.2em]">
          <article className="text-[#fff] flex-col w-full">
            {selectFile.length > 0 ? (
              selectFile.map((file, index) => (
                <article key={index} id="files">
                  {file.name}
                </article>
              ))
            ) : (
              <p className="xs:text-[0.90em]md:text-[1.1em] lg:text-[1.2em] custom-xl:text-[1em]">
                No file selected
              </p>
            )}
          </article>
        </article>

        <section
          className="w-[70%] h-[100] mx-auto text-center bg-[#555] text-[#fff] rounded-[5px] mt-4 border-2 border-dashed border-[#000] p-4 mb-[80px] hover:bg-[#222] cursor-pointer overflow-y-auto max-h-[auto] min-h-[300px] xs:w-[90%] xs:text-[0.90em] xs:flex xs:flex-col xs:justify-center xs:items-center lg:min-h-[400px] lg:max-h-max custom-xl:min-h-[300px] custom-xl:max-h-max"
          id="content"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <article className={`${isDragging ? "" : ""}`}>
            {isDragging ? (
              <p className="text-center xs:text-[0.90em] md:text-[1.1em] lg:text-[1.2em] xl:text-[1.4em] custom-xl:text-[1.2em] opacity-5">
                Drop here
              </p>
            ) : (
              <p className="text-center xs:text-[0.90em] md:text-[1.1em] lg:text-[1.2em] xl:text-[1.2em] custom-xl:text-[1.2em]">
                Drag & Drop your files here
              </p>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default App;
