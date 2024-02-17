"use client"
import Body from "@/components/body";
import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import HomeMenu from "@/components/ui/home-menu/home-menu";
import Canvas from "@/components/ui/layers-menu/canvas";
import LayersMenu from "@/components/ui/layers-menu/layers-menu";
import { VSeparator } from "@/components/ui/separator";
import UsersMenu from "@/components/ui/users-menu/users-menu";




export default function Home() {
  
  return (
    <>
      {/* <div className="w-screen h-screen relative">
        <div className="w-full h-full flex flex-col fixed">
          <Header />
          <div className="z-10 h-full flex flex-row justify-between ">
            <div className="h-full flex flex-row ">
              <HomeMenu />
              <SideBar />
            </div>
            <div className="h-full flex flex-row">
              <UsersMenu />
              <LayersMenu />
            </div>
          </div>
        </div>
        <Body />
       
      </div> */}
      <div className="w-full h-screen flex justify-center items-center">
        <Canvas />
      </div>
    </> 
  );
}
