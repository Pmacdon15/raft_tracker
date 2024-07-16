'use client'
import { RaftArrived } from "@/actions/actions";
import { Button } from "./button";
import { redirect } from "next/navigation";

function formatTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export default function OnTheWaterList({ WhiteboardOnWater }: { WhiteboardOnWater: any }) {
    return (
        <div className="flex flex-col items-center bg-[#288FF2] align-middle w-full gap-8 shadow-lg rounded p-1 text-[#F3F9FE]">
            <h1 className="decoration-solid underline">
                On The Water List:
            </h1>
            {WhiteboardOnWater.length === 0 ? (
                <p>No Rafts on the water.</p>
            ) : (
                WhiteboardOnWater.map((item: any) => (
                    <div key={item.raft_res_name} className="flex flex-row flex-wrap w-full md:w-5/6 items-center justify-between p-1">
                        <p className="flex-1">{item.raft_res_name}</p>
                        <p className="flex-1">{item.raft_type}</p>
                        <p className="flex-1">{item.unit}</p>
                        <p className="flex-1">{formatTime(new Date(item.departure_date))}</p>
                        <form action={RaftArrived}>
                            <input type="hidden" name="raft_res_name" value={item.raft_res_name} />
                            <Button>Click on Arrival</Button>
                        </form>
                    </div>
                ))
            )}
        </div>
    );
};