import { fetchData, getServerSideProps } from "@/pages";
import React, { useState } from "react";
import toast from "react-hot-toast";

const URLInputFiled = ({ refreshData, deviceId, url }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFromSubmit = (e) => {
    e.preventDefault();
    const mainURL = e.target.url.value;

    if (mainURL === "") {
      setError("Enter a validate url");
      return;
    } else if (mainURL) {
      setError("");
    }

    
    const previousUrl = url.find((u) => u.mainURL === mainURL);
    if (previousUrl) {
      setError("This url allready tockn");
      return;
    } else {
      setError("");
    }

    setLoading(true);

    fetch("https://url-mu.vercel.app/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ deviceId, mainURL }),
    })
      .then(() => {
        toast.success("Add Success");
        e.target.reset();
        refreshData();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-4  max-w-lg sm:mx-auto">
      <form onSubmit={handleFromSubmit} className="flex justify-center ">
        <div className="sm:max-w-[400px] w-full">
          <input
            type="text"
            name="url"
            placeholder="URL"
            className="border border-[#6f49dc] px-3 py-2 w-full  outline-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="border border-[#6f49dc]  sm:px-10 px-5 py-2 bg-[#6f49dc] text-white right-0"
          >
            {loading ? (
              <div className="w-12">
                <div
                  className="animate-spin  inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      <i className="text-red-600  block">{error}</i>
    </div>
  );
};

export default URLInputFiled;
