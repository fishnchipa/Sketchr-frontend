"use client"
import Body from "@/components/body";
import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import HomeMenu from "@/components/ui/home-menu/home-menu";
import Canvas from "@/components/ui/layers-menu/canvas";
import LayersMenu from "@/components/ui/layers-menu/layers-menu";
import { VSeparator } from "@/components/ui/separator";
import UsersMenu from "@/components/ui/users-menu/users-menu";
import { addNewLayer } from "@/lib/features/layersMenuSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CanvasRef } from "@/lib/types";
import { useRef, useState } from "react";




export default function Home() {

  const cava = useAppSelector((state) => state.layerMenu.layers);
  const dispatch = useAppDispatch();

  // const click = () => {

  //   const data = cavasref.current?.getData();
  //   dispatch(addNewLayer(data!))
  // }
  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Header />
        
        <div className="fixed w-full h-full mt-[56px]">
          <div className="absolute left-0 h-full flex ">
            <HomeMenu />
            <SideBar />
          </div>
          <div className="absolute left-1/2 right-1/2 top-1/2 bottom-1/2">
            <Body />
          </div>
          <div className="absolute right-0 h-full flex">
            <UsersMenu />
            <LayersMenu />
          </div>
          

        </div>
      </div>
    </> 
  );
}

{/* <>
<div className="w-screen h-screen">
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
</div>
</>  */}