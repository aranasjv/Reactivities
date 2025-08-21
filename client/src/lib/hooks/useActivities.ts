import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../agent";
import type { Activity } from "../types";

export const useActivities = (id?: string) => {

  const queryClient = useQueryClient();

  const { data: activities, isPending: isPendingSelectAll } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    }, 
    enabled: !id && location.pathname === '/activities',
    staleTime: 1000 * 60 * 5
  });

  const { data: activity, isLoading: isLoadingActivityById } = useQuery({
    queryKey: ["activity", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id
  });

  const { mutateAsync: updateActivity, isPending: isPendingUpdate } = useMutation<Activity, Error, Activity>({
    mutationFn: async (activity) => {
      const response = await agent.put<Activity>(`/activities`, activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });

  const { mutateAsync: createActivity, isPending: isPendingCreate } = useMutation<Activity, Error, Activity>({
    mutationFn: async (activity) => {
      const response = await agent.post<Activity>(`/activities`, activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });

  const { mutateAsync: deleteActivity, isPending: isPendingDelete } = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const response = await agent.delete(`/activities/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    }
  });

  return {
    activities,
    isPendingSelectAll,
    isPendingUpdate,
    updateActivity,
    isPendingCreate,
    createActivity,
    deleteActivity,
    isPendingDelete,
    activity,
    isLoadingActivityById
  };
}