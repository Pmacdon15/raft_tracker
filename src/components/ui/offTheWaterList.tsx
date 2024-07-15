
  
export default function OffTheWater({ WhiteboardOffWater }: { WhiteboardOffWater: any }) {
    console.log(WhiteboardOffWater);
    return (
        <>
            <div className="flex flex-col items-center align-middle w-full gap-8 text-white">
                <h1 className="decoration-solid underline">Off The Water List:</h1>
                {WhiteboardOffWater.length > 0 ? (
                    WhiteboardOffWater.map((item: any) => (
                        <div key={item.raft_res_name} className="flex flex-row flex-wrap w-full md:w-5/6 items-center justify-between p-1">
                            <p>{item.raft_res_name}</p>
                            <p>{item.raft_type}</p>
                            <p>{item.unit}</p>
                            <p>{item.departure_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p>{item.arrival_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    ))
                ) : (
                    <p>No have arrived today.</p>
                )}
            </div>
        </>
    );
};