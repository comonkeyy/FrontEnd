// src/api/matchingApi.ts
import type { Matching } from '../@types/apiTypes';

export async function requestMatching(house_id: number) {
  const res = await fetch('/api/matchings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ house_id }),
  });
  return res.json();
}

export async function getAllMatchings(): Promise<Matching[]> {
  const res = await fetch('/api/matchings');
  return res.json();
}

export async function updateMatchingStatus(
  matchingId: number,
  status: 'pending' | 'rejected' | 'completed',
) {
  const res = await fetch(`/api/matchings/${matchingId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
