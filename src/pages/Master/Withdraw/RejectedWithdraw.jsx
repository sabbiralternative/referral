import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const RejectedWithdraw = () => {
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewWithdraw",
    status: "REJECTED",
    pagination: true,
    page: activePage,
  };
  const { allWithdraw, isLoading, isSuccess } = useGetALLWithdraw(payload);
  const meta = allWithdraw?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        time="Rejection Time"
        data={allWithdraw?.result}
        activePage={activePage}
        meta={meta}
        setActivePage={setActivePage}
        title="Rejected Withdraw"
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default RejectedWithdraw;
