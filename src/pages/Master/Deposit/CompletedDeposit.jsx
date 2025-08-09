import { useState } from "react";
import Deposit from "../../../components/ui/Master/Deposit";
import useGetALLDeposit from "../../../hooks/Master/Deposit/useGetALLDeposit";

const CompletedDeposit = () => {
  const [activePage, setActivePage] = useState(1);
  const payload = {
    type: "viewUTR",
    status: "APPROVED",
    pagination: true,
    page: activePage,
  };
  const { allUTRs, isLoading, isSuccess } = useGetALLDeposit(payload);
  const meta = allUTRs?.pagination;
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Deposit
        setActivePage={setActivePage}
        time="Approval Time"
        data={allUTRs.result}
        meta={meta}
        activePage={activePage}
        title="Completed Deposit"
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default CompletedDeposit;
