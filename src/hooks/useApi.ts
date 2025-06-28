import { useState } from 'react';

export function useApi<T, P = any>(apiFunc: (params: P) => Promise<any>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const request = async (params: P) => {
    setLoading(true);
    try {
      const res = await apiFunc(params);
      setData(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
}
