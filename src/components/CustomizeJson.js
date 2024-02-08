import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { BsCloudDownload } from "react-icons/bs";

let finalJson = [];

function CustomizeJson({ customizedJson }) {
  const [oneQustion, setOneQustion] = useState(customizedJson[1]);
  const [active, setActive] = useState(1);
  const [complete, setComplete] = useState(false);

  const addTag = (tag) => {
    if (active === 1) {
      finalJson.push([...customizedJson[0], "tag"], [...oneQustion, tag]);
      setActive(active + 1);
      setOneQustion(customizedJson[active + 1]);
    }
    if (active >= 2 && active < customizedJson.length - 1) {
      finalJson.push([...oneQustion, tag]);
      setActive(active + 1);
      setOneQustion(customizedJson[active + 1]);
    }
    if (active + 1 === customizedJson.length) {
      finalJson.push([...oneQustion, tag]);
      setComplete(true);
    }

    console.log(finalJson, "sss");
  };

  const downloadCSV = () => {
    const csvData = finalJson
      .map((item) => item.map((field) => `"${field}"`).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "customized_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      {complete ? (
        <div className="flex flex-col w-full items-center gap-20 justify-center p-4">
          <div className="flex flex-col w-full">
            <div>
              Qustion {active}/{customizedJson.length - 1}
            </div>
            <div className="w-full bg-[#F4F4F4] min-h-[150px] rounded-lg p-5 flex items-center justify-center">
              You are Finished
            </div>
          </div>
          <div
            className="flex flex-col  items-center justify-center gap-5"
            onClick={downloadCSV}
          >
            <BsCloudDownload className="h-20 w-20 cursor-pointer" />
            <div className="text-2xl font-semibold ">download</div>
            {/* {finalJson && <button onClick={downloadCSV}>Download CSV</button>} */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full items-start justify-center p-4">
          <div className="flex flex-col w-full">
            <div>
              Qustion {active}/{customizedJson.length - 1}
            </div>
            <div className="w-full min-h-[150px] bg-[#F4F4F4] rounded-lg p-5 flex items-center justify-center">
              {oneQustion[0]}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div>Answer</div>
            <div className="w-full min-h-[150px] bg-[#F4F4F4] rounded-lg p-5 flex items-center justify-center">
              {oneQustion[1]}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full p-10">
            <FaCheck
              className="rounded-full text-white bg-green-500 w-20 h-20 p-5 cursor-pointer"
              onClick={() => addTag("yes")}
            />
            <IoCloseSharp
              className="rounded-full bg-red-500 w-20 h-20 p-5 cursor-pointer text-white"
              onClick={() => addTag("no")}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CustomizeJson;
