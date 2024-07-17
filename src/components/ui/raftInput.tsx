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
        <div className="flex flex-col w-full  md:w-4/6 p-5 items-center mt-4 justify-center shadow-lg rounded bg-[#288FF2]" >
            <h1 className=" text-[#F3F9FE]">
                Enter Raft Info:
            </h1>
            <p>{state?.message}</p>
            <form ref={formRef}  action={() => {
                if (formRef.current) {
                    formAction(new FormData(formRef.current));
                    (formRef.current as HTMLFormElement).reset();
                  };
            }}className="flex flex-row flex-wrap w-5/6 items-center justify-center gap-2 " >
                <Input placeholder="Reservation name" id="resName" name="resName" />
                <h2 className=" text-[#F3F9FE]">Select raft type:</h2>
                <div className="flex flex-wrap justify-center items-center  text-[#F3F9FE] gap-3">
                  <p>Sm <Checkbox id="smRaft" name="smRaft" /></p>
                    <p>Md <Checkbox id="mdRaft" name="mdRaft" /></p>
                    <p>Lg <Checkbox id="lgRaft" name="lgRaft" /></p>
                    <p>Sk <Checkbox id="sk" name="skKayak" /></p>
                    <p>Dk <Checkbox id="dk" name="dkKayak" /></p>
                    <p>Bb <Checkbox id="bb" name="bigBlue" /></p>
                </div>
                <h2 className="text-[#F3F9FE]">Unit Number:</h2> <Input placeholder="Unit number" id="unit" name="unit" />
                <Button disabled={pending}>Departed</Button>
            </form>
        </div>

    );
}
