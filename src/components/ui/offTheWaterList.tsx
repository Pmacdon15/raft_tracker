import { Button } from "./button";
const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
  
export default function OffTheWater({ WhiteboardOffWater }: { WhiteboardOffWater: any }) {
    console.log(WhiteboardOffWater);
    return (
        <>
            <div className="flex flex-col items-center  align-middle w-3/6 gap-8">
                <h1>
                    Off The Water List:
                </h1>
                {WhiteboardOffWater.map((item: any) => (
                    <div key={item.raft_res_name} className="flex flex-row w-5/6 md:w-3/6 items-center justify-between p-1 " >
                        <p>{item.raft_res_name}</p>
                        <p>{item.raft_type}</p>
                        <p>{item.unit}</p>
                        <p>{item.departure_date}</p>
                        <p>{item.arrival}</p>
                      
                    </div>
                ))}
            </div>
        </>
    );
};