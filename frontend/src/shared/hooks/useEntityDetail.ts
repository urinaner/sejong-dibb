// src/shared/hooks/useEntityDetail.ts
import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '../utils/error/errorHandler';

interface EntityDetailResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useEntityDetail<T, IdType = number>(
  fetchFunction: (id: IdType) => Promise<T>,
  id: IdType | null,
  options = { enabled: true },
): EntityDetailResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !options.enabled) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchFunction(id);
        setData(response);
      } catch (err) {
        setError(getErrorMessage(err));
        console.error('Error fetching entity detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, fetchFunction, options.enabled, refreshKey]);

  return {
    data,
    isLoading,
    error,
    refresh,
  };
}
