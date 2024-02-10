
import ChangeColorModal from "@/components/ui/change-color/change-color-modal";
import ColorWheel from "@/components/ui/change-color/color-wheel";


export default function Home() {
  

  return (
    <>
    
    <div className="flex flex-col w-screen h-screen gap-y-5 bg-[#494949] relative">

      <ColorWheel 
        size={500}
        radius={200}
        thickness={26}
      />
      <div className="bg-emerald-500 w-[500px] h-[500px]">

      </div>
    </div>
    </>
  );
}
