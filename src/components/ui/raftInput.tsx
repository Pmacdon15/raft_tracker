'use client'
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Button } from "./button";
import { RaftDeparted } from "../../actions/actions";
import { useFormState, useFormStatus } from 'react-dom'
import { useRef } from 'react';
const initialState = {
    message: '',
}

export default function RaftInput() {
    const [state, formAction] = useFormState(RaftDeparted, initialState)
    const { pending } = useFormStatus();
    const formRef = useRef(null);
    return (
        <div className="flex flex-col  w-4/6  items-center mt-10 justify-center " >
            <h1 className=" text-white">
                Enter Raft Info:
            </h1>
            <p>{state?.message}</p>
            <form ref={formRef}  action={() => {
                if (formRef.current) {
                    formAction(new FormData(formRef.current));
                    (formRef.current as HTMLFormElement).reset();
                  };
            }}className="flex flex-row flex-wrap w-5/6 items-center gap-2 " >
                <Input placeholder="Reservation name" id="resName" name="resName" />
                <div className="flex flex-wrap justify-center items-center text-white  gap-3">
                    Sm<Checkbox id="smRaft" name="smRaft" />
                    Md<Checkbox id="mdRaft" name="mdRaft" />
                    Lg<Checkbox id="lgRaft" name="lgRaft" />
                    Sk<Checkbox id="sk" name="skKayak" />
                    Dk<Checkbox id="dk" name="dkKayak" />
                    Bb<Checkbox id="bb" name="bigBlue" />
                </div>
                <p className="text-white">Unit Number:</p> <Input placeholder="Unit number" id="unit" name="unit" />
                <Button disabled={pending}>Departed</Button>
            </form>
        </div>

    );
}
