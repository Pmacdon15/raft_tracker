import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function RaftDeparted(formData: FormData) {
  'use server';
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
    return false;
  }
  // Check if the at least one checkbox is checked
  if (!smRaft && !mdRaft && !lgRaft && !skKayak && !dkKayak && !bigBlue) {
    return false;
  }
  // Make sure only one check box is checked
  if (smRaft && (mdRaft || lgRaft || skKayak || dkKayak || bigBlue)) {
    return false;

  }
  if (mdRaft && (smRaft || lgRaft || skKayak || dkKayak || bigBlue)) {
    return false;
  }
  if (lgRaft && (smRaft || mdRaft || skKayak || dkKayak || bigBlue)) {
    return false;
  }
  if (skKayak && (smRaft || mdRaft || lgRaft || dkKayak || bigBlue)) {
    return false;
  }
  if (dkKayak && (smRaft || mdRaft || lgRaft || skKayak || bigBlue)) {
    return false;
  }
  if (bigBlue && (smRaft || mdRaft || lgRaft || skKayak || dkKayak)) {
    return false;
  }
  // Assign raftType based on check boxes
  let raftType = '';
  if (smRaft) {
    raftType = 'smRaft';
  } else if (mdRaft) {
    raftType = 'mdRaft';
  } else if (lgRaft) {
    raftType = 'lgRaft';
  } else if (skKayak) {
    raftType = 'skKayak';
  } else if (dkKayak) {
    raftType = 'dkKayak';
  } else {
    raftType = 'bigBlue';
  }
  // Make sure the unit is not empty
  if (!unit) {
    return false;
  }

  console.log(reservationName, smRaft, mdRaft, lgRaft, skKayak, dkKayak, bigBlue, unit, raftType)
  try {
    const addDeparture = await sql`
      INSERT INTO RTRaftList (raft_res_name, raft_type,departure_date, unit ) VALUES (${reservationName.toString()},${raftType}, CURRENT_TIMESTAMP, ${unit.toString()});
    `;
    if (!addDeparture) {
      return false;
    }
  } catch (error) {
    console.error((error as Error).message);
    return false;
  }
  return true;
}
// get All rafts that departed after 1201am today
export async function currentRaftsOnWater() {
  'use server';
  let result;
  try {
    const raftList = await sql`
      SELECT * FROM RTRaftList 
      WHERE departure_date >= CURRENT_DATE AND arrival_date IS NULL
    `;
    console.log(raftList);
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

// Add arrival time to raft
export async function RaftArrived(unit: number) {
  'use server';
  try {
    const addArrival = await sql`
      UPDATE RTRaftList SET arrival_date = CURRENT_TIMESTAMP WHERE unit = ${unit};
    `;
    console.log(addArrival);
    if (!addArrival) {
      return false;
    }
  } catch (error) {
    console.error((error as Error).message);
    return false;
  }
  revalidatePath("/");
}

// Get all rafts that are off the water
export async function currentRaftsOffWater() {
  'use server';
  let result;
  try {
    const raftList = await sql`
      SELECT * FROM RTRaftList 
      WHERE arrival_date >= CURRENT_DATE
    `;
    console.log(raftList);
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