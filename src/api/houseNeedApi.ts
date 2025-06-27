// src/api/houseNeedApi.ts
import type { HouseNeed } from '../@types/apiTypes';

export async function createHouseNeed(data: {
  region: string;
  size: string;
  floor: string;
}) {
  const res = await fetch('/api/house_need', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getHouseNeeds(
  careworker_id: number,
): Promise<HouseNeed[]> {
  const res = await fetch(`/api/house_need?careworker_id=${careworker_id}`);
  return res.json();
}
