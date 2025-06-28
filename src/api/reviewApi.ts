// src/api/reviewApi.ts
import type { Review } from '../@types/apiTypes';

export async function createReview(data: {
  author_id: number;
  target_id: number;
  target_type: 'house' | 'matching' | 'user' | 'careworker';
  content: string;
}) {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getReviews(
  target_id: number,
  target_type: string,
): Promise<Review[]> {
  const res = await fetch(
    `/api/reviews?target_id=${target_id}&target_type=${target_type}`,
  );
  return res.json();
}
