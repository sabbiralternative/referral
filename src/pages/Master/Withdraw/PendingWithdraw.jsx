import { useState } from "react";
import Withdraw from "../../../components/ui/Master/Withdraw";
import useGetALLWithdraw from "../../../hooks/Master/Withdraw/useGetAllWithdraw";

const PendingWithdraw = () => {
  const [activePage, setActivePage] = useState(1);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const payload = {
    type: "viewWithdraw",
    status: "PENDING",
    pagination: true,
    amountFrom,
    amountTo,
    page: activePage,
  };
  const { allWithdraw, refetchAllWithdraw, isLoading, isSuccess } =
    useGetALLWithdraw(payload, 30000);
  const meta = allWithdraw?.pagination;

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <Withdraw
        refetchAllWithdraw={refetchAllWithdraw}
        activePage={activePage}
        setActivePage={setActivePage}
        meta={meta}
        setAmountFrom={setAmountFrom}
        setAmountTo={setAmountTo}
        data={allWithdraw?.result}
        title="Pending Withdraw"
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default PendingWithdraw;
