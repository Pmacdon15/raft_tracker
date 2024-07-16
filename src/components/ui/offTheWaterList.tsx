'use client'


export default function OffTheWater({ WhiteboardOffWater }: { WhiteboardOffWater: any }) {
    function formatTime(time: Date): string {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    return (
        <div className="flex flex-col flex-wrap items-center bg-[#288FF2] align-middle w-full gap-8 shadow-lg rounded  text-[#F3F9FE]">
            <h1 className="decoration-solid underline">Off The Water List:</h1>
            {WhiteboardOffWater.length > 0 ? (
                WhiteboardOffWater.map((item: any) => (
                    <div key={item.raft_res_name} className="flex flex-row  w-full md:w-5/6 items-center justify-between ">
                        <p className=" w-full md:w-6/12 text-left">{item.raft_res_name}</p>
                        <p className="w-full md:w-1/12 text-center">{item.raft_type}</p>
                        <p className="w-full md:w-1/12 text-center">{item.unit}</p>
                        <p className="w-full md:w-1/12 text-center">{formatTime(new Date(item.departure_date))}</p>
                        <p className="w-full md:w-1/12 text-center">{formatTime(new Date(item.departure_date))}</p>
                        <p className="w-full md:w-1/12 text-center">{formatTime(new Date(item.arrival_date))}</p>
                    </div>
                ))
            ) : (
                <p>No one has arrived today.</p>
            )}
        </div>
    );
};