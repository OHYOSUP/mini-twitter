import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

interface twitts {
  title: string;
  twitt: string;
  id: number;
  createdAt: string;
}
interface twittsResponse {
  twitts: twitts[];
}

const fetcher = (args: string) => fetch(args).then((res) => res.json());

const Home = () => {
  const { data } = useSWR<twittsResponse>("/api/post", fetcher);


  console.log(data);
  const router = useRouter();
  return (
    <div className="w-[100%] h-[100vh] flex items-center flex-col ">
      <div className="max-w-[40%] h-max border-2 flex flex-col">
        {data?.twitts.map((twitt) => (
          <div
            key={twitt.id}
            className="w-[40vw] px-20 mt-16 border-b-2 flex flex-col gap-5"
          >
            <div className="flex gap-10 ">
              <span>{twitt.title}</span>
              <span className="text-slate-400 text-sm">2023 05 23</span>
            </div>
            <div className="mt-3">
              <p>{twitt.twitt}</p>
            </div>
            <div className="pb-10">
              <div>💗 12</div>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => {
          router.push("/post");
        }}
        className="fixed cursor-pointer bottom-20 right-20 border-2 border-slate-700 rounded-full"
      >
        <div className="p-3 text-3xl">➕</div>
      </div>
    </div>
  );
};

export default Home;
