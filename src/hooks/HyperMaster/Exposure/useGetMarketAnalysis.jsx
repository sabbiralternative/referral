import { useQuery } from "@tanstack/react-query";
import useContextState from "../../useContextState";
import axios from "axios";
import { API } from "../../../api";

const useGetMarketAnalysis = () => {
  const { token, tokenLoading } = useContextState();
  const { data: marketAnalysis = [], refetch: refetchMarketAnalysis } =
    useQuery({
      queryKey: ["branch"],
      enabled: !tokenLoading,
      queryFn: async () => {
        const res = await axios.post(
          API.marketAnalysis,
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
    });
  return { marketAnalysis, refetchMarketAnalysis };
};

export default useGetMarketAnalysis;
