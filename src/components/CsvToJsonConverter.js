import React from "react";
import Papa from "papaparse";
import { BsCloudUpload } from "react-icons/bs";

function CsvToJsonConverter({ onJsonCustomization }) {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file.size >= 10*1024*1024) {
      alert('File size is over than 10 MB');
      return;
    }

    if (file) {
      Papa.parse(file, {
        // header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const nonEmptyData = results.data.filter((entry) =>
            Object.values(entry).some(Boolean)
          );
          console.log("Finished:", nonEmptyData);
          onJsonCustomization(nonEmptyData);
        },
      });
    }
  };


  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <label
        htmlFor="uploadCsvFile"
        className="flex cursor-pointer items-center justify-center"
      >
        <BsCloudUpload className="h-20 w-20 cursor-pointer" />
        <input
          id="uploadCsvFile"
          name="uploadCsvFile"
          onChange={(e) => handleFileUpload(e)}
          type="file"
          className="hidden"
          accept=".csv"
        />
      </label>
      <div className="text-2xl font-semibold ">Upload csv</div>
    </div>
  );
}

export default CsvToJsonConverter;
