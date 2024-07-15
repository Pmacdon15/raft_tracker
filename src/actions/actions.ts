
'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
//MARK: Raft departed
export async function RaftDeparted( prevState: any,formData: FormData) {  
  const reservationName = formData.get('resName');
  const smRaft = formData.get('smRaft');
  const mdRaft = formData.get('mdRaft');
  const lgRaft = formData.get('lgRaft');
  const skKayak = formData.get('skKayak');
  const dkKayak = formData.get('dkKayak');
  const bigBlue = formData.get('bigBlue');
  const unit = formData.get('unit');
  // Check if the reservation name is empty
  if (!reservationName) {
    return {message:"Please enter a reservation name"};
  }
  // Check if the at least one checkbox is checked
  if (!smRaft && !mdRaft && !lgRaft && !skKayak && !dkKayak && !bigBlue) {
    return {message: 'Please select a raft type'};
  }
  // Make sure only one check box is checked
  if (smRaft && (mdRaft || lgRaft || skKayak || dkKayak || bigBlue)) {
    return {message: 'Please select only one raft type'};
  }
  if (mdRaft && (smRaft || lgRaft || skKayak || dkKayak || bigBlue)) {
    return {message: 'Please select only one raft type'};
  }
  if (lgRaft && (smRaft || mdRaft || skKayak || dkKayak || bigBlue)) {
    return {message: 'Please select only one raft type'};
  }
  if (skKayak && (smRaft || mdRaft || lgRaft || dkKayak || bigBlue)) {
    return {message: 'Please select only one raft type'};
  }
  if (dkKayak && (smRaft || mdRaft || lgRaft || skKayak || bigBlue)) {
    return {message: 'Please select only one raft type'};
  }
  if (bigBlue && (smRaft || mdRaft || lgRaft || skKayak || dkKayak)) {
    return {message: 'Please select only one raft type'};
  }
  // Assign raftType based on check boxes
  let raftType = '';
  if (smRaft) {
    raftType = 'sm Raft';
  } else if (mdRaft) {
    raftType = 'md Raft';
  } else if (lgRaft) {
    raftType = 'lg Raft';
  } else if (skKayak) {
    raftType = 'sk Kayak';
  } else if (dkKayak) {
    raftType = 'dk Kayak';
  } else {
    raftType = 'big Blue';
  }
  // Make sure the unit is not empty
  if (!unit) {
    return {message: 'Please enter a unit number'};
  }
  
  try {
    const addDeparture = await sql`
      INSERT INTO RTRaftList (raft_res_name, raft_type, departure_date, unit ) VALUES (${reservationName.toString()},${raftType}, CURRENT_TIMESTAMP, ${unit.toString()});
    `;
    if (!addDeparture) {
      return {message: 'Error adding raft to the list'};
    }
  } catch (error) {
    // console.error((error as Error).message);
    return {message: 'Error adding raft to the list'};
  }
  revalidatePath("/");
  redirect('/');
  
}

//MARK: Get rafts that departed today
export async function currentRaftsOnWater() {  
  let result;
  try {
    const raftList = await sql`
      SELECT * FROM RTRaftList 
      WHERE departure_date >= CURRENT_DATE AND arrival_date IS NULL
    `;
    if (!raftList) {
      return []; // Return an empty array if raftList is falsy
    }
    result = raftList.rows;
  } catch (error) {
    // console.error((error as Error).message);
    return []; // Return an empty array on error
  }
  revalidatePath("/"); 
  return result;
}

//MARK: Add arrival time to raft by reservation name
export async function RaftArrived(formData: FormData) {
    try{
      const reservationName = formData.get('raft_res_name');
      if (!reservationName) {
        return {message: 'Please enter a reservation name'};
      }
      const addArrival = await sql`
        UPDATE RTRaftList SET arrival_date = CURRENT_TIMESTAMP WHERE raft_res_name = ${reservationName.toString()};
      `;
      if (!addArrival) {
        throw new Error('Error adding arrival time');
      }    
    } catch (error) {
      console.error((error as Error).message);
      return {message: 'Error adding arrival time'};
    }
    revalidatePath("/");
    redirect('/');
}

//MARK: Get all rafts that are off the water
export async function currentRaftsOffWater() {
  'use server';
  let result;
  try {
    const raftList = await sql`
      SELECT * FROM RTRaftList 
      WHERE arrival_date >= CURRENT_DATE
    `;
    if (!raftList) {
      return []; // Return an empty array if raftList is falsy
    }
    result = raftList.rows;
  } catch (error) {
    console.error((error as Error).message);
    return []; // Return an empty array on error
  }
  revalidatePath("/");
  return result;
}