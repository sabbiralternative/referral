import { useEffect, useState } from "react";
import { AdminRole } from "../../constant/constant";
import { useGetIndex } from "../../hooks";
import useBalance from "../../hooks/useBalance";
import useContextState from "../../hooks/useContextState";
import DashboardDW from "./DashboardDW";
import { jwtDecode } from "jwt-decode";
import Loader from "../../components/ui/Loader/Loader";

const Home = () => {
  const [depositPermission, setDepositPermission] = useState(false);
  const [withdrawPermission, setWithdrawPermission] = useState(false);
  const { data } = useGetIndex({ type: "getDashboardDW" });
  const { adminRole, token } = useContextState();
  const { balanceData, isLoading, isPending } = useBalance();
  const defineBalanceColor = (amount) => {
    if (amount) {
      const parseAmount = parseFloat(amount);
      if (parseAmount === 0) {
        return "white";
      } else if (parseAmount > 0) {
        return "#39da8a";
      } else {
        return "#ff5b5c";
      }
    }
  };
  const deposit = data?.result?.deposit;
  const withdraw = data?.result?.withdraw;

  useEffect(() => {
    if (adminRole) {
      if (adminRole === AdminRole.admin_staff) {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;
        const depositPermission = permissions?.includes("deposit") ?? false;
        const withdrawPermission = permissions?.includes("withdraw") ?? false;
        setDepositPermission(depositPermission);
        setWithdrawPermission(withdrawPermission);
      }
      if (adminRole === AdminRole.hyper_master) {
        setDepositPermission(true);
        setWithdrawPermission(true);
      }
    }
  }, [adminRole, token]);

  return (
    <div
      className="container-xxl flex-grow-1 container-p-y"
      style={{
        display: "none",
      }}
    >
      {adminRole &&
        adminRole !== "admin_staff" &&
        adminRole !== "branch_staff" && (
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="row">
                {/* <div className="col-sm-6 col-12 mb-4">
                <a>
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {balanceData?.upperLevelCreditReferance}
                      </h2>
                      <span className="text-muted">
                        Upper Level Credit Reference
                      </span>
                    </div>
                  </div>
                </a>
              </div> */}
                <div className="col-sm-6 col-12 mb-4">
                  <a>
                    <div className="card">
                      <div className="card-body text-center">
                        <h2
                          className="mb-1"
                          style={{
                            color: `${defineBalanceColor(
                              balanceData?.upperLevel
                            )}`,
                          }}
                        >
                          {isLoading || isPending ? (
                            <Loader />
                          ) : (
                            balanceData?.upperLevel
                          )}
                        </h2>
                        <span className="text-muted">Upper Level</span>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.downLevelOccupyBalance
                        )}
                      </h2>
                      <span className="text-muted">Total Client Balance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="row">
                {/* <div className="col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h2 className="mb-1">
                      {balanceData?.downLevelCreditReferance}
                    </h2>
                    <span className="text-muted">Down level Cred. Reference</span>
                  </div>
                </div>
              </div> */}
                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.availableBalance ||
                          (balanceData?.availableBalance == 0 &&
                            balanceData?.availableBalance?.toFixed(2))
                        )}
                      </h2>
                      <span className="text-muted">Available Balance</span>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.totalMasterBalance
                        )}
                      </h2>
                      <span className="text-muted">Total Master Balance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.usersToday
                        )}
                      </h2>
                      <span className="text-muted">New Users Today</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.depositToday
                        )}
                      </h2>
                      <span className="text-muted">Total Deposit Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2 className="mb-1">
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.withdrawToday
                        )}
                      </h2>
                      <span className="text-muted">Total Withdraw Today</span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-12 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h2
                        style={{
                          color: `${defineBalanceColor(balanceData?.pnlToday)}`,
                        }}
                        className="mb-1"
                      >
                        {isLoading || isPending ? (
                          <Loader />
                        ) : (
                          balanceData?.pnlToday
                        )}
                      </h2>
                      <span className="text-muted">P/L Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {adminRole === AdminRole.hyper_master ||
      adminRole === AdminRole.admin_staff ? (
        <div className="d-lg-flex" style={{ gap: "10px" }}>
          {depositPermission && (
            <DashboardDW
              data={deposit}
              title="Pending Deposit"
              emptyMessage="No pending deposit"
            />
          )}
          {withdrawPermission && (
            <DashboardDW
              data={withdraw}
              title="Pending Withdraw"
              emptyMessage="No pending withdraw"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
