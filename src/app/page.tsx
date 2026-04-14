import { Header } from "@/components/Header";
import type { Metadata } from "next";
import Home from "@/components/Homepage/Home";
// import NewFile from "@/components/Homepage/NewFile";


export const metadata: Metadata = {
  title: "EXPERGO — Continuous Portfolio Risk Control",
  description:
    "EarlySafe by Expergo: detect risk early, influence portfolio outcomes, and quantify trajectory for NBFCs, HFCs, and banks.",
};

export default function HomePage() {
  return (
    <>
    <Header/>
    <Home/>
    {/* <NewFile/> */}
    </>
  );
}
