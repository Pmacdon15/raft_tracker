import { RaftArrived }  from "@/actions/actions";
import { Button } from "./button";
import { redirect } from "next/navigation";

export default async function OnTheWaterList({ WhiteboardOnWater }: { WhiteboardOnWater: any }) {    
    return (
        <div className="flex flex-col w-full items-center  gap-8">
            <h1>
                On The Water List:
            </h1>
            {WhiteboardOnWater.map((item: any) => (
                <div key={item.raft_res_name} className="flex flex-row w-5/6 md:w-3/6 items-center justify-between p-1 " >
                    <p>{item.raft_res_name}</p>
                    <p>{item.raft_type}</p>  
                    <p>{item.unit}</p>                                        
                    <form action={async() =>
                    {
                        'use server';                       
                        RaftArrived(item.unit);
                        redirect('/');
                    }}>
                        <Button>Click on Arrival</Button>
                    </form>
                </div>
            ))}

        </div>
    );
};