
import Body from "@/components/body";
import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import HomeMenu from "@/components/ui/home-menu/home-menu";
import LayersMenu from "@/components/ui/layers-menu/layers-menu";
import UsersMenu from "@/components/ui/users-menu/users-menu";





export default function Home() {

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <Body /> 
        <div className="fixed left-0 h-full mt-[56px] z-max">
          <HomeMenu />
          <SideBar />
        </div>
        <div className="fixed right-0 h-full mt-[56px] flex z-max">
          <UsersMenu />
          <LayersMenu />

        </div>
      </div>
    </> 
  );
}
