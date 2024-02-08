import { useState } from "react";
import CsvToJsonConverter from "./components/CsvToJsonConverter";
import CustomizeJson from "./components/CustomizeJson";

export default function App() {
  const [customizedJson, setCustomizedJson] = useState(null);

  const handleJsonCustomization = (json) => {
    // Implement logic to customize the JSON data
    // Update state with the customized JSON
    setCustomizedJson(json);
  };
  console.log(customizedJson, "daa");

  return (
    <div className="w-screen h-screen bg-gray-100 text-slate-700">
      <div className=" flex max-w-md min-h-screen bg-white mx-auto spacwhitee-y-5 items-center justify-center">
        {customizedJson ? (
          <CustomizeJson customizedJson={customizedJson} />
        ) : (
          <CsvToJsonConverter onJsonCustomization={handleJsonCustomization} />
        )}
      </div>
    </div>
  );
}
