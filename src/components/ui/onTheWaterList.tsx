'use client'
import { RaftArrived } from "@/actions/actions";
import { Button } from "./button";
import { redirect } from "next/navigation";

export default function OnTheWaterList({ WhiteboardOnWater }: { WhiteboardOnWater: any }) {
    return (
        <div className="flex flex-col items-center  align-middle w-full gap-8  text-white">
            <h1 className="decoration-solid underline">
                On The Water List:
            </h1>
            {WhiteboardOnWater.length === 0 ? (
                <p>No Rafts on the water</p>
            ) : (
                WhiteboardOnWater.map((item: any) => (
                    <div key={item.raft_res_name} className="flex flex-row flex-wrap w-full md:w-5/6 items-center justify-between   p-1 " >
                        <p>{item.raft_res_name}</p>
                        <p>{item.raft_type}</p>
                        <p>{item.unit}</p>
                        <p>{item.departure_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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