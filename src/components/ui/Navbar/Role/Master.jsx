import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGetDWCount from "../../../../hooks/Master/useGetDWCount";
import notification from "../../../../assets/notification.wav";
import useContextState from "../../../../hooks/useContextState";
import { jwtDecode } from "jwt-decode";
import { AdminRole } from "../../../../constant/constant";

const Master = () => {
  const [navList, setNavList] = useState(null);

  const [depositPermission, setDepositPermission] = useState(false);
  const [withdrawPermission, setWithdrawPermission] = useState(false);
  const [clientPermission, setClientPermission] = useState(false);
  const [reportPermission, setReportPermission] = useState(false);
  const [paymentPermission, setPaymentPermission] = useState(false);
  const { readOnly, setShowSocialLink, adminRole, setAddChecker, token } =
    useContextState();
  const { dwCount } = useGetDWCount();

  const [depositReport, setDepositReport] = useState(false);

  const navigate = useNavigate();

  /* Sound notification start */
  const [depositCount, setDepositCount] = useState(null);
  const [withdrawCount, setWithdrawCount] = useState(null);
  const depositRefCount = useRef(depositCount);
  const withdrawRefCount = useRef(withdrawCount);
  const [playSound, setPlaySound] = useState(false);

  useEffect(() => {
    if (dwCount?.depositCount >= 0 || dwCount?.withdrawCount >= 0) {
      if (
        (playSound &&
          depositCount !== null &&
          depositCount > depositRefCount.current) ||
        (playSound &&
          withdrawCount !== null &&
          withdrawCount > withdrawRefCount.current)
      ) {
        new Audio(notification).play();
      }
      depositRefCount.current = depositCount;
      withdrawRefCount.current = withdrawCount;
      setDepositCount(dwCount?.depositCount);
      setWithdrawCount(dwCount?.withdrawCount);
      setPlaySound(true);
    }
  }, [depositCount, withdrawCount, playSound, dwCount]);
  /* Sound notification end */

  /* close modal click outside */

  const handleNavigate = (link) => {
    navigate(`/${link}`);
    setNavList(null);
  };

  useEffect(() => {
    if (adminRole) {
      if (
        adminRole === AdminRole.branch_staff ||
        adminRole === AdminRole.admin_staff
      ) {
        const decode = jwtDecode(token);
        const permissions = decode?.permissions;

        const depositPermission = permissions?.includes("deposit") ?? false;
        const withdrawPermission = permissions?.includes("withdraw") ?? false;
        const clientPermission = permissions?.includes("client") ?? false;
        const reportPermission = permissions?.includes("report") ?? false;
        const paymentPermission = permissions?.includes("payment") ?? false;

        setDepositPermission(depositPermission);
        setWithdrawPermission(withdrawPermission);
        setClientPermission(clientPermission);
        setReportPermission(reportPermission);
        setPaymentPermission(paymentPermission);
      } else {
        setDepositPermission(true);
        setWithdrawPermission(true);
        setClientPermission(true);
        setReportPermission(true);
        setPaymentPermission(true);
      }
    }
  }, [adminRole, token]);

  return (
    <ul className="menu-inner" style={{ marginLeft: "0px" }}>
      {adminRole !== "branch_staff" && (
        <li className="menu-item">
          <Link tp="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Dashboards">Dashboard</div>
          </Link>
        </li>
      )}

      {adminRole === "master" ||
      (adminRole === "admin_staff" && clientPermission) ||
      (adminRole === "branch_staff" && clientPermission) ? (
        <li
          onMouseEnter={() => setNavList("client")}
          onMouseLeave={() => setNavList(null)}
          className={`menu-item ${navList === "client" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Clients">Clients</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("view-client")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-user"></i>
                <div data-i18n="View Clients">View Clients</div>
              </a>
            </li>
            {!readOnly && adminRole !== "admin_staff" && (
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("add-client")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-user"></i>
                  <div data-i18n="Add Client">Add Client</div>
                </a>
              </li>
            )}

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("clients-with-balance")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-user"></i>
                <div data-i18n="Add Client">Clients with balance</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("all-client")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-user"></i>
                <div data-i18n="Add Client">All Clients</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("active-client")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-user"></i>
                <div data-i18n="Add Client">Active Clients</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("inactive-client")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-user"></i>
                <div data-i18n="Add Client">Inactive Clients</div>
              </a>
            </li>
          </ul>
        </li>
      ) : null}

      {adminRole === "master" ||
      (adminRole === "branch_staff" && paymentPermission) ||
      (adminRole === AdminRole.admin_staff && paymentPermission) ? (
        <li
          onMouseEnter={() => setNavList("payment")}
          onMouseLeave={() => setNavList(null)}
          className={`menu-item ${navList === "payment" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Payments">Payments</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("view-payment-method")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Payment Method">View Payment Method</div>
              </a>
            </li>

            {!readOnly && adminRole !== AdminRole.admin_staff && (
              <>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-bank-account")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">Add Bank Account</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-QR")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">Add QR</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-UPI")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">Add UPI</div>
                  </a>
                </li>
                {adminRole !== AdminRole.master &&
                  adminRole !== AdminRole.branch_staff && (
                    <li className="menu-item">
                      <a
                        onClick={() => handleNavigate("add-whatsapp-deposit")}
                        className="menu-link"
                      >
                        <i className="menu-icon tf-icons bx bxs-institution"></i>
                        <div data-i18n="Add Payment Method">
                          Add Whatsapp Deposit
                        </div>
                      </a>
                    </li>
                  )}

                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-USDT-TRC20")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">Add USDT (TRC20)</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("add-USDT-BEP20")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="Add Payment Method">Add USDT (BEP20)</div>
                  </a>
                </li>
              </>
            )}
          </ul>
        </li>
      ) : null}
      {depositPermission && (
        <li
          onMouseEnter={() => setNavList("deposit")}
          onMouseLeave={() => setNavList(null)}
          className={`menu-item ${navList === "deposit" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            {depositCount ? (
              <span
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#39da8a",
                  marginRight: "5px",
                  padding: "0px 4px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                {depositCount}
              </span>
            ) : (
              <i className="menu-icon tf-icons bx bx-layout"></i>
            )}

            <div data-i18n="Deposit">Deposit</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("pending-deposit")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Pending Deposit">Pending Deposit</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("completed-deposit")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Completed Deposit">Completed Deposit</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("rejected-deposit")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Rejected Deposit">Rejected Deposit</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("utr-search")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Rejected Deposit"> UTR Search</div>
              </a>
            </li>
          </ul>
        </li>
      )}
      {withdrawPermission && (
        <li
          onMouseEnter={() => setNavList("withdraw")}
          onMouseLeave={() => setNavList(null)}
          className={`menu-item ${navList === "withdraw" ? "open" : ""}`}
        >
          <a className="menu-link menu-toggle">
            {withdrawCount ? (
              <span
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#39da8a",
                  marginRight: "5px",
                  padding: "0px 4px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                {withdrawCount}
              </span>
            ) : (
              <i className="menu-icon tf-icons bx bx-layout"></i>
            )}

            <div data-i18n="Withdraw">Withdraw</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("pending-withdraw")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Pending Withdraw">Pending Withdraw</div>
              </a>
            </li>

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("completed-withdraw")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Completed Withdraw">Completed Withdraw</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("rejected-withdraw")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="Rejected Withdraw">Rejected Withdraw</div>
              </a>
            </li>
          </ul>
        </li>
      )}

      {adminRole === "master" && (
        <>
          <li
            onMouseEnter={() => setNavList("bonus")}
            onMouseLeave={() => setNavList(null)}
            className={`menu-item ${navList === "bonus" ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              {dwCount?.claimCount !== 0 ? (
                <span
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#39da8a",
                    marginRight: "5px",
                    padding: "0px 4px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  {dwCount?.claimCount}
                </span>
              ) : (
                <i className="menu-icon tf-icons bx bx-layout"></i>
              )}

              <div data-i18n="Withdraw">Bonus</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("pending-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Pending Bonus</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("completed-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Completed Withdraw">Completed Bonus</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("rejected-bonus")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Rejected Withdraw">Rejected Bonus</div>
                </a>
              </li>
            </ul>
          </li>

          <li
            onMouseEnter={() => setNavList("exposure")}
            onMouseLeave={() => setNavList(null)}
            className={`menu-item ${navList === "exposure" ? "open" : ""}`}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Settings">Exposure</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("market-analysis")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Market Analysis</div>
                </a>
              </li>

              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("current-bets")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Add Banner">Current Bets</div>
                </a>
              </li>
            </ul>
          </li>
          <li
            onMouseEnter={() => setNavList("staff")}
            onMouseLeave={() => setNavList(null)}
            className={`menu-item ${navList === "staff" ? "open" : ""}`}
          >
            <a className="menu-link menu-toggle">
              <i className="menu-icon tf-icons bx bx-layout"></i>

              <div data-i18n="Withdraw">Staff</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("view-staff")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">View Staff</div>
                </a>
              </li>
              <li className="menu-item">
                <a onClick={() => setAddChecker(true)} className="menu-link">
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="Pending Withdraw">Add Staff</div>
                </a>
              </li>
            </ul>
          </li>
        </>
      )}
      {adminRole === "master" ||
      (adminRole === "admin_staff" && reportPermission) ||
      (adminRole === "branch_staff" && reportPermission) ? (
        <li
          onMouseEnter={() => setNavList("report")}
          onMouseLeave={() => setNavList(null)}
          className={`menu-item ${navList === "report" ? "open" : ""}`}
        >
          <a
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="menu-link menu-toggle"
          >
            <i className="menu-icon tf-icons bx bx-layout"></i>
            <div data-i18n="Settings">Report</div>
          </a>

          <ul className="menu-sub">
            {clientPermission && (
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("client-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Client Report</div>
                </a>
              </li>
            )}
            {adminRole === AdminRole.master ||
            adminRole === AdminRole.branch_staff ? (
              <>
                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">Deposit Report</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a
                    onClick={() => handleNavigate("1st-deposit-report")}
                    className="menu-link"
                  >
                    <i className="menu-icon tf-icons bx bxs-institution"></i>
                    <div data-i18n="View Banners">1st Deposit Report</div>
                  </a>
                </li>
              </>
            ) : null}

            {adminRole === AdminRole.admin_staff && (
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
                onMouseEnter={() => setDepositReport(true)}
                onMouseLeave={() => setDepositReport(false)}
                className="menu-link menu-toggle"
              >
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Settings">Deposit Report</div>
                <ul
                  className="menu-sub"
                  style={{
                    display: depositReport ? "block" : "none",
                    right: "100%",
                    top: "0px",
                    left: "-100%",
                    zIndex: "99999",
                    background: "#273143",
                  }}
                >
                  {depositPermission && (
                    <>
                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">Deposit Report</div>
                        </a>
                      </li>

                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("1st-deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">1st Deposit Report</div>
                        </a>
                      </li>

                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("2nd-deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">2nd Deposit Report</div>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("3rd-deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">3rd Deposit Report</div>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("4th-deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">4th Deposit Report</div>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("5th-deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">5th Deposit Report</div>
                        </a>
                      </li>

                      <li className="menu-item">
                        <a
                          onClick={() => handleNavigate("no-deposit-report")}
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">No Deposit Report</div>
                        </a>
                      </li>

                      <li className="menu-item">
                        <a
                          onClick={() =>
                            handleNavigate("no-deposit-report-last-15-days")
                          }
                          className="menu-link"
                        >
                          <i className="menu-icon tf-icons bx bxs-institution"></i>
                          <div data-i18n="View Banners">
                            No deposit last 15 days
                          </div>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </a>
            )}

            {withdrawPermission && (
              <li className="menu-item">
                <a
                  onClick={() => handleNavigate("withdraw-report")}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Withdraw Report</div>
                </a>
              </li>
            )}

            <li className="menu-item">
              <a
                onClick={() => handleNavigate("transfer-statement")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Banners">Transfer Statement</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                onClick={() => handleNavigate("client-branch-change-report")}
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bxs-institution"></i>
                <div data-i18n="View Banners">Client Branch Change Report</div>
              </a>
            </li>
          </ul>
        </li>
      ) : null}

      {adminRole != AdminRole.master &&
        adminRole !== AdminRole.branch_staff && (
          <li
            onMouseEnter={() => setNavList("setting")}
            onMouseLeave={() => setNavList(null)}
            className={`menu-item ${navList === "setting" ? "open" : ""}`}
          >
            <a
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="menu-link menu-toggle"
            >
              <i className="menu-icon tf-icons bx bx-layout"></i>
              <div data-i18n="Settings">Settings</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a
                  onClick={() => {
                    setShowSocialLink(true);
                  }}
                  className="menu-link"
                >
                  <i className="menu-icon tf-icons bx bxs-institution"></i>
                  <div data-i18n="View Banners">Social Links</div>
                </a>
              </li>
            </ul>
          </li>
        )}
    </ul>
  );
};

export default Master;
