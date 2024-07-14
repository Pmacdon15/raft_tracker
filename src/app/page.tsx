import RaftInput from "../components/ui/raftInput";
import OnTheWaterList from "@/components/ui/onTheWaterList";
import OffTheWater from "@/components/ui/offTheWaterList";
import {currentRaftsOnWater, currentRaftsOffWater} from "@/actions/actions";


export default async function Home() {
  const TheListOnTheWater = await currentRaftsOnWater();
  const TheListOffTheWater = await currentRaftsOffWater();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-blue-600 gap-6 text-2xl ">
      <RaftInput />
      <OnTheWaterList  WhiteboardOnWater={TheListOnTheWater} />
      {/* <OffTheWater WhiteboardOffWater={TheListOffTheWater} /> */}
    </main>
  );
}
