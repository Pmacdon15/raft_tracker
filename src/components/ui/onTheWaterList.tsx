import { Button } from "./button";
export default function OnTheWaterList({ Whiteboard }: { Whiteboard: any }) {
    return (
        <div className="flex flex-col  w-2/6 gap-8">
            <h1>
                On The Water List:
            </h1>
            {Whiteboard.map((item: any) => (
                <div key={item.resName} className="flex flex-row items-center justify-between " >
                    <p>{item.resName}</p>
                    <p>{item.type}</p>
                    <p>{item.departure}</p>
                    <form>
                        <Button>Arrived</Button>
                    </form>
                </div>
            ))}

        </div>
    );
};