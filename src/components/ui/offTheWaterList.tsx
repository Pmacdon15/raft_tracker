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
        <div className="flex flex-col items-center bg-[#288FF2] align-middle w-full gap-8 shadow-lg rounded p-1 text-[#F3F9FE]">
            <h1 className="decoration-solid underline">Off The Water List:</h1>
            {WhiteboardOffWater.length > 0 ? (
                WhiteboardOffWater.map((item: any) => (
                    <div key={item.raft_res_name} className="flex flex-row flex-wrap w-full md:w-5/6 items-center justify-between p-1 gap-1">
                        <p>{item.raft_res_name}</p>
                        <p>{item.raft_type}</p>
                        <p>{item.unit}</p>
                        <p>{formatTime(new Date(item.departure_date))}</p>
                        <p>{formatTime(new Date(item.arrival_date))}</p>
                    </div>
                ))
            ) : (
                <p>No one has arrived today.</p>
            )}
        </div>
    );
};