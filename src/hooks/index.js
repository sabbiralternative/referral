import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
import { AdminRole } from "../constant/constant";
import useContextState from "./useContextState";

export const useGetIndex = (payload) => {
  const { adminRole } = useContextState();
  return useQuery({
    queryKey: ["index"],
    enabled:
      adminRole === AdminRole.hyper_master ||
      adminRole === AdminRole.admin_staff
        ? true
        : false,
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.index}`, payload);
      return data;
    },
    gcTime: 0,
  });
};
