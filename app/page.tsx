
import ChangeColorModal from "@/components/ui/change-color/change-color-modal";
import ColorWheel from "@/components/ui/change-color/color-wheel";


export default function Home() {
  

  return (
    <>
    
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-y-5 bg-[#494949]">

      <ColorWheel 
          size={500}
          radius={200}
          thickness={26}
        /> 
    </div>
   
    </>
  );
}
