// src/api/houseApi.ts
import type { House } from '../@types/apiTypes';

export async function getMyHouses(ownerId: number): Promise<House[]> {
  const res = await fetch(`/api/houses?owner_id=${ownerId}`);
  return res.json();
}

export async function registerHouse(data: {
  address: string;
  region: string;
  size: string;
  floor: string;
  image?: File;
}) {
  const formData = new FormData();
  Object.entries(data).forEach(([k, v]) => {
    if (v) formData.append(k, v as string | Blob);
  });
  const res = await fetch('/api/houses', {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function updateHouse(houseId: number, data: Partial<House>) {
  const res = await fetch(`/api/houses/${houseId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteHouse(houseId: number) {
  const res = await fetch(`/api/houses/${houseId}`, {
    method: 'DELETE',
  });
  return res.json();
}
