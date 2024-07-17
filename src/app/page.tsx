import RaftInput from "../components/ui/raftInput";
import OnTheWaterList from "@/components/ui/onTheWaterList";
import OffTheWater from "@/components/ui/offTheWaterList";
import {currentRaftsOnWater, currentRaftsOffWater} from "@/actions/actions";
type TripInfo = {
  raft_res_name: string;
  raft_type: string;
  departure_date: Date;
  arrival_date: Date;
  unit: number;
};


export default async function Home() {
  const TheListOnTheWater = await currentRaftsOnWater() as TripInfo[];
  const TheListOffTheWater = await currentRaftsOffWater() as TripInfo[];
  return (
    <main className="flex min-h-svh max-h-fit pb-6 flex-col items-center bg-[#027BF0] gap-4 text-xl">
      <RaftInput />
      <OnTheWaterList WhiteboardOnWater={TheListOnTheWater} />
      <OffTheWater WhiteboardOffWater={TheListOffTheWater} />
    </main>
  );
}
