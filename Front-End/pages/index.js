import URLInputFiled from "@/components/URLInputFiled/URLInputFiled";
import URLTable from "@/components/URLTable/URLTable";
import {
  getIdLocalStroge,
  setIdLocalStroge,
} from "@/utility/localStroges/localStroges";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = ({ data }) => {
  const [url, setUrl] = useState(data);
  const [deviceId, setDeviceId] = useState("");

  const refreshData = async () => {
    const res = await fetch(`https://url-mu.vercel.app/`);
    const data = await res.json();
    setUrl(data);
  };

  useEffect(() => {
    setIdLocalStroge();

    const uuId = getIdLocalStroge();
    setDeviceId(uuId);

    setInterval(() => {
      refreshData();
    }, 5000);
  }, []);

  const handleDateFilter = (e) => {
    const value = e.target.value;
    if (value === "old-new") {
      const oldNew = [...url].sort(function (a, b) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      setUrl(oldNew);
    } else if (value === "new-old") {
      const newOld = [...url].sort(function (a, b) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setUrl(newOld);
    }
  };

  return (
    <div className="mt-5">
      <URLInputFiled refreshData={refreshData} deviceId={deviceId} url={url} />
      <URLTable
        deviceId={deviceId}
        url={url}
        refreshData={refreshData}
        handleDateFilter={handleDateFilter}
      />

      <div className="flex items-end absolute top-0 left-1/2 -translate-x-1/2 h-full">
        <i className="text-white whitespace-nowrap">
          Copyright{" "}
          <Link
            target="_blank"
            href="https://mostafizar.netlify.app/"
            className="text-cyan-400 underline"
          >
            Mostafizar
          </Link>{" "}
          2023
        </i>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`https://url-mu.vercel.app/`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Home;
