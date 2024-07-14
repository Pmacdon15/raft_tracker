import RaftInput from "../components/ui/raftInput";
import OnTheWaterList from "@/components/ui/onTheWaterList";

const TheList = [
  { resName: "John", type: "sm", departure: "10:00" },
  { resName: "Jane", type: "md", departure: "10:30" },
  { resName: "Joe", type: "lg", departure: "11:00" },
  { resName: "Jill", type: "sk", departure: "11:30" },
  { resName: "Jack", type: "dk", departure: "12:00" },
  { resName: "Jen", type: "bb", departure: "12:30" },
]



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-blue-600 gap-6 text-2xl ">
      <RaftInput />

      <OnTheWaterList  Whiteboard={TheList} />
    </main>
  );
}
