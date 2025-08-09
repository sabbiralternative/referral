import { useState } from "react";
import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

const RejectedDeposit = () => {
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewUTR",
    status: "REJECTED",
    pagination: true,
    page: activePage,
  };
  const { allUTRs, isLoading, isSuccess } = useGetALLDeposit(payload);
  const meta = allUTRs?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit
        time="Rejection Time"
        data={allUTRs?.result}
        activePage={activePage}
        meta={meta}
        setActivePage={setActivePage}
        title="Rejected Deposit"
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default RejectedDeposit;
