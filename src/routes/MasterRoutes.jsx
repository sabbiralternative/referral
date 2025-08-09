import ViewChecker from "../pages/HyperMaster/Staff/ViewChecker";
import ActivityLogs from "../pages/Master/ActivityLogs/ActivityLogs";
import CompletedBonus from "../pages/Master/Bonus/CompletedBonus/CompletedBonus";
import PendingBonus from "../pages/Master/Bonus/PendingBonus/PendingBonus";
import RejectedBonus from "../pages/Master/Bonus/RejectedBonus/RejectedBonus";
import ActiveClient from "../pages/Master/Client/ActiveClient";
import AddClient from "../pages/Master/Client/AddClient";
import AllClient from "../pages/Master/Client/AllClient";
import ClientWithBalance from "../pages/Master/Client/ClientWithBalance";
import InActiveClient from "../pages/Master/Client/InActiveClient";
import PNL from "../pages/Master/Client/PNL";
import ViewClient from "../pages/Master/Client/ViewClient/ViewClient";

import CompletedDeposit from "../pages/Master/Deposit/CompletedDeposit";
import PendingDeposit from "../pages/Master/Deposit/PendingDeposit";
import RejectedDeposit from "../pages/Master/Deposit/RejectedDeposit";
import UTRSearch from "../pages/Master/Deposit/UTRSearch";
import AddBankAccount from "../pages/Master/Payments/AddBankAccount";
import AddNewPaymentGateway from "../pages/Master/Payments/AddNewPaymentGateway";
import AddQR from "../pages/Master/Payments/AddQR";
import AddUPI from "../pages/Master/Payments/AddUPI";
import AddUSDT from "../pages/Master/Payments/AddUSDT";
import AddUSDTBEP20 from "../pages/Master/Payments/AddUSDTBEP20";
import AddWhatsappDeposit from "../pages/Master/Payments/AddWhatsappDeposit";
import ViewPaymentMethod from "../pages/Master/Payments/ViewPaymentMethod";
import DepositStatement from "../pages/Master/Statement/DepositStatement";
import WithdrawStatement from "../pages/Master/Statement/WithdrawStatement";
import CompletedWithdraw from "../pages/Master/Withdraw/CompletedWithdraw";
import PendingWithdraw from "../pages/Master/Withdraw/PendingWithdraw";
import RejectedWithdraw from "../pages/Master/Withdraw/RejectedWithdraw";

export const MasterRoutes = [
  {
    path: "/view-client",
    element: <ViewClient />,
  },
  {
    path: "/add-client",
    element: <AddClient />,
  },
  {
    path: "/clients-with-balance",
    element: <ClientWithBalance />,
  },
  {
    path: "/all-client",
    element: <AllClient />,
  },
  {
    path: "/active-client",
    element: <ActiveClient />,
  },
  {
    path: "/inactive-client",
    element: <InActiveClient />,
  },
  {
    path: "/pending-deposit",
    element: <PendingDeposit />,
  },
  {
    path: "/completed-deposit",
    element: <CompletedDeposit />,
  },
  {
    path: "/rejected-deposit",
    element: <RejectedDeposit />,
  },
  {
    path: "/utr-search",
    element: <UTRSearch />,
  },
  {
    path: "/pending-withdraw",
    element: <PendingWithdraw />,
  },
  {
    path: "/rejected-withdraw",
    element: <RejectedWithdraw />,
  },
  {
    path: "/completed-withdraw",
    element: <CompletedWithdraw />,
  },
  {
    path: "/pending-bonus",
    element: <PendingBonus />,
  },
  {
    path: "/rejected-bonus",
    element: <RejectedBonus />,
  },
  {
    path: "/completed-bonus",
    element: <CompletedBonus />,
  },
  {
    path: "/view-payment-method",
    element: <ViewPaymentMethod />,
  },
  {
    path: "/add-bank-account",
    element: <AddBankAccount />,
  },
  {
    path: "/add-QR",
    element: <AddQR />,
  },
  {
    path: "/add-USDT-TRC20",
    element: <AddUSDT />,
  },
  {
    path: "/add-USDT-BEP20",
    element: <AddUSDTBEP20 />,
  },
  {
    path: "/add-UPI",
    element: <AddUPI />,
  },
  {
    path: "/add-whatsapp-deposit",
    element: <AddWhatsappDeposit />,
  },
  {
    path: "/add-payment-gateway",
    element: <AddNewPaymentGateway />,
  },
  {
    path: "/pnl",
    element: <PNL />,
  },
  {
    path: "/deposit-statement",
    element: <DepositStatement />,
  },
  {
    path: "/withdraw-statement",
    element: <WithdrawStatement />,
  },
  {
    path: "/view-staff",
    element: <ViewChecker />,
  },
  {
    path: "/activity-logs",
    element: <ActivityLogs />,
  },
];
