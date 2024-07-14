import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { RaftDeparted } from "../../actions/actions";

export default function RaftInput() {
    return (
        <div className="flex flex-col  w-4/6  items-center justify-center" >
            <h1>
                Enter Raft Info:
            </h1>

            <form action={RaftDeparted} className="flex flex-row w-5/6 items-center gap-2" >
                <Input placeholder="Reservation name" id="resName" name="resName" />               
                Sm<Checkbox id="smRaft" name="smRaft" />
                Md<Checkbox id="mdRaft" name="mdRaft" />
                Lg<Checkbox id="lgRaft" name="lgRaft" />
                Sk<Checkbox id="sk" name="skKayak" />
                Dk<Checkbox id="dk" name="dkKayak" />
                Bb<Checkbox id="bb" name="bigBlue" />
                Unit <Input placeholder="Unit" id="unit" name="unit" />
                <Button>Departed</Button>
            </form>

        </div>

    );
}
