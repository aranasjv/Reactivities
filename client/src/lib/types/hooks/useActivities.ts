import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "..";
import agent from "../../agent";

export const useActivities = () => {
  
  const queryClient = useQueryClient();

  const { data: activities, isPending: isPendingSelectAll } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    }
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
    isPendingDelete
  };
}