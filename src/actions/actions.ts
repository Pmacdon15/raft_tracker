import { sql } from "@vercel/postgres";

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

  const addDeparture = await sql`
    INSERT INTO departures (reservation_name, raft_type,departure_date, unit ) VALUES (${reservationName}, CURRENT_TIMESTAMP, ${unit})
  `;
  if (!addDeparture) {
    return false;
  }

  console.log(reservationName, smRaft, mdRaft, lgRaft, skKayak, dkKayak, bigBlue, unit, raftType);
  return true;
}