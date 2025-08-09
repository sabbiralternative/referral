import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useContextState from "../../useContextState";
import { API } from "../../../api";
import handleRandomToken from "../../../utils/handleRandomToken";

const useGetAllBranch = (postData) => {
  const { token, tokenLoading, adminRole } = useContextState();
  const { data: branches = [], refetch: refetchAllBranch } = useQuery({
    queryKey: ["branch", postData],
    enabled: !tokenLoading,
    queryFn: async () => {
      if (adminRole != "hyper_master") {
        return;
      }
      const generatedToken = handleRandomToken();

      const payload = { token: generatedToken, ...postData };

      const res = await axios.post(API.viewBranches, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
  });
  return { branches, refetchAllBranch };
};

export default useGetAllBranch;
