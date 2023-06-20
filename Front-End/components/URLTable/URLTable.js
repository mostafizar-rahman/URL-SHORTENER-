import React, { useRef, useState } from "react";
import { MdDeleteForever, MdFileCopy } from "react-icons/md";
import toast from "react-hot-toast";

const URLTable = ({ deviceId, url, refreshData, handleDateFilter }) => {
  const textAreaRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState("");

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.innerText);
      toast.success("Copy Success");
    }
  };

  const handleDelete = (id) => {
    setLoading(false);
    setItemId(id);
    fetch(`https://url-mu.vercel.app/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        refreshData();
        toast.success("Delete Success");
        setLoading(true);
      })
      .catch((error) => {});
  };

  const id = deviceId;
  const urlList = url.filter(({ deviceId }) => deviceId === id);

  return (
    <>
      <label className="flex justify-between items-center max-w-2xl w-full mx-auto mt-7 px-4 sm:px-0">
        <span className="text-white text-base bg-[#6f49dc]  px-2 relative after:absolute after:content-[''] after:top-0 after:-right-5  after:h-full after:border-l-[20px] after:border-l-[#6f49dc] after:border-b-transparent after:border-b-[12px] after:border-t-transparent after:border-t-[12px]">
          Sort By Date:{" "}
        </span>

        <select
          name="sortByDate"
          onChange={handleDateFilter}
          className="w-32 h-7 rounded-sm"
        >
          <option value="old-new">Old-New</option>
          <option value="new-old">New-Old</option>
        </select>
      </label>
      <div className=" mx-auto sm:p-4 flex  justify-center ">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="">
              <tr className="text-left text-white">
                <th className="py-3 px-7">No</th>
                <th className="py-3 px-7">Main Url</th>
                <th className="py-3 px-7">Sort Url</th>
                <th className="py-3 px-7 whitespace-nowrap">Delete Item</th>
                <th className="py-3 px-7 ">Click</th>
              </tr>
            </thead>
            <tbody>
              {urlList.map(
                ({ _id, shortId, mainURL, hostURL, vistHistory }, index) => {
                  return (
                    <tr
                      className="hover:bg-gray-700 hover:bg-opacity-10 text-white group transition ease-in-out delay-150 duration-700"
                      key={index}
                    >
                      <td className="py-3 px-7">
                        <p>{index + 1}</p>
                      </td>
                      <td className="py-3 px-7 max-w-[300px] ">
                        <p className="break-words">{mainURL}</p>
                      </td>
                      <td className="py-3 px-7 ">
                        <div className="flex items-center gap-3">
                          <p ref={textAreaRef}>
                            {hostURL}
                            {shortId}
                          </p>
                          <span
                            onClick={copyToClipboard}
                            className=" min-w-[25px]"
                          >
                            <MdFileCopy className="text-2xl cursor-pointer sm:opacity-0 group-hover:opacity-100  transition ease-in-out delay-150 duration-700" />
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-7">
                        {loading ? (
                          <p className="text-3xl cursor-pointer ">
                            <MdDeleteForever
                              className="hover:text-red-400 transition ease-in-out delay-150 duration-700"
                              onClick={() => handleDelete(_id)}
                            />
                          </p>
                        ) : itemId === _id ? (
                          <div className="">
                            <div
                              className="animate-spin  inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-white rounded-full ml-3"
                              role="status"
                              aria-label="loading"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-3xl cursor-pointer ">
                            <MdDeleteForever
                              className="hover:text-red-400 transition ease-in-out delay-150 duration-700"
                              onClick={() => handleDelete(_id)}
                            />
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-7">
                        <p className=" cursor-pointer ">{vistHistory.length}</p>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default URLTable;
