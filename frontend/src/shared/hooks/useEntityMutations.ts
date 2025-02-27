// src/shared/hooks/useEntityMutations.ts
import { useState } from 'react';
import { getErrorMessage } from '../utils/error/errorHandler';

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface EntityMutationsResult<T, CreateDto, UpdateDto> {
  create: {
    execute: (data: CreateDto) => Promise<T | null>;
    isLoading: boolean;
    error: string | null;
  };
  update: {
    execute: (id: number | string, data: UpdateDto) => Promise<T | null>;
    isLoading: boolean;
    error: string | null;
  };
  remove: {
    execute: (id: number | string) => Promise<boolean>;
    isLoading: boolean;
    error: string | null;
  };
}

export function useEntityMutations<
  T,
  CreateDto = Partial<T>,
  UpdateDto = Partial<T>,
>(api: {
  create: (data: CreateDto) => Promise<T>;
  update: (id: number | string, data: UpdateDto) => Promise<T>;
  remove: (id: number | string) => Promise<any>;
}): EntityMutationsResult<T, CreateDto, UpdateDto> {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);

  const create = async (data: CreateDto, options: MutationOptions<T> = {}) => {
    setCreateLoading(true);
    setCreateError(null);

    try {
      const result = await api.create(data);
      if (options.onSuccess) options.onSuccess(result);
      return result;
    } catch (err) {
      const message = getErrorMessage(err);
      setCreateError(message);
      if (options.onError) options.onError(message);
      console.error('Error creating entity:', err);
      return null;
    } finally {
      setCreateLoading(false);
    }
  };

  const update = async (
    id: number | string,
    data: UpdateDto,
    options: MutationOptions<T> = {},
  ) => {
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const result = await api.update(id, data);
      if (options.onSuccess) options.onSuccess(result);
      return result;
    } catch (err) {
      const message = getErrorMessage(err);
      setUpdateError(message);
      if (options.onError) options.onError(message);
      console.error('Error updating entity:', err);
      return null;
    } finally {
      setUpdateLoading(false);
    }
  };

  const remove = async (
    id: number | string,
    options: MutationOptions<boolean> = {},
  ) => {
    setRemoveLoading(true);
    setRemoveError(null);

    try {
      await api.remove(id);
      if (options.onSuccess) options.onSuccess(true);
      return true;
    } catch (err) {
      const message = getErrorMessage(err);
      setRemoveError(message);
      if (options.onError) options.onError(message);
      console.error('Error removing entity:', err);
      return false;
    } finally {
      setRemoveLoading(false);
    }
  };

  return {
    create: {
      execute: create,
      isLoading: createLoading,
      error: createError,
    },
    update: {
      execute: update,
      isLoading: updateLoading,
      error: updateError,
    },
    remove: {
      execute: remove,
      isLoading: removeLoading,
      error: removeError,
    },
  };
}
