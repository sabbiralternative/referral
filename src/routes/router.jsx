import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import { HyperMasterRoutes } from "./HyperMasterRoutes";
import { MasterRoutes } from "./MasterRoutes";
import ClientReport from "../pages/Report/ClientReport";
import DepositReport from "../pages/Report/DepositReport";
import WithdrawReport from "../pages/Report/WithdrawReport";
import TransferStatement from "../pages/Report/TransferStatement";
import FirstDepositReport from "../pages/Report/FirstDepositReport";
import NoDepositReport from "../pages/Report/NoDepositReport";
import { AdminMasterRoutes } from "./AdminMaster";
import ChangePasswordSuccess from "../pages/ChangePasswordSuccess/ChangePasswordSuccess";
import ChangePasswordAfterLogin from "../pages/ChangePassword/ChangePasswordAfterLogin";
import ClientBranchChangeReport from "../pages/Report/ClientBranchChangeReport";
import SecondDepositReport from "../pages/Report/SecondDepositReport";
import ThirdDepositReport from "../pages/Report/ThirdDepositReport";
import FourthDepositReport from "../pages/Report/FourthDepositReport";
import FifthDepositReport from "../pages/Report/FifthDepositReport";
import NoDepositReportLast15Days from "../pages/Report/NoDepositReportLast15Days";
import AddNotification from "../pages/HyperMaster/Settings/AddNotification";
import ViewNotification from "../pages/HyperMaster/Settings/ViewNotification";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/client-report",
          element: <ClientReport />,
        },
        {
          path: "/deposit-report",
          element: <DepositReport />,
        },
        {
          path: "/1st-deposit-report",
          element: <FirstDepositReport />,
        },
        {
          path: "/2nd-deposit-report",
          element: <SecondDepositReport />,
        },
        {
          path: "/3rd-deposit-report",
          element: <ThirdDepositReport />,
        },
        {
          path: "/4th-deposit-report",
          element: <FourthDepositReport />,
        },
        {
          path: "/5th-deposit-report",
          element: <FifthDepositReport />,
        },
        {
          path: "/no-deposit-report",
          element: <NoDepositReport />,
        },
        {
          path: "/no-deposit-report-last-15-days",
          element: <NoDepositReportLast15Days />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/transfer-statement",
          element: <TransferStatement />,
        },
        {
          path: "/client-branch-change-report",
          element: <ClientBranchChangeReport />,
        },
        {
          path: "/change-password-after-login",
          element: <ChangePasswordAfterLogin />,
        },
        {
          path: "/add-notification",
          element: <AddNotification />,
        },
        {
          path: "/view-notification",
          element: <ViewNotification />,
        },
        /*Hyper Master Routes */
        ...HyperMasterRoutes,
        /* Master Routes */
        ...MasterRoutes,
        ...AdminMasterRoutes,
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/change-password-success",
      element: <ChangePasswordSuccess />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
