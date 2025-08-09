import { useQuery } from "@tanstack/react-query";
import useContextState from "../useContextState";
import { API } from "../../api";
import axios from "axios";

const useGetDWCount = () => {
  const { token, tokenLoading } = useContextState();

  const { data: dwCount = {}, refetch: refetchDWCount } = useQuery({
    queryKey: ["withdrawPRC"],
    enabled: !tokenLoading,
    queryFn: async () => {
      const res = await axios.post(
        API.dwCount,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;
      if (data?.success) {
        return data?.result;
      }
    },
    refetchInterval: 15000,
  });
  return { dwCount, refetchDWCount };
};

export default useGetDWCount;
