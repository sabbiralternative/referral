import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { MdOutlineContentCopy } from "react-icons/md";
import { useEffect, useState } from "react";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import toast from "react-hot-toast";
// import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { FaRegCopy } from "react-icons/fa";
import { Pagination } from "rsuite";
import EditPendingWithdraw from "../../modal/Master/Withdraw/EditPendingWithdraw";
import { AdminRole, clientColor } from "../../../constant/constant";
import Loader from "../Loader/Loader";

const Withdraw = ({
  data,
  title,
  time,
  meta,
  activePage,
  setActivePage,
  setAmountFrom,
  setAmountTo,
  refetchAllWithdraw,
  isLoading,
  isSuccess,
}) => {
  const {
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [showPendingWithdraw, setShowPendingWithdraw] = useState(false);

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  const handleCopy = (item) => {
    const formattedText = `
    Client Id: ${item?.userId || ""}
    Amount: ${Math.abs(item?.amount) || ""}
    Bank Account Name: ${item?.bank_account_name || ""}
    Account Number: ${item?.account_number || ""}
    Bank Name: ${item?.bank_name || ""}
    IFSC: ${item?.ifsc || ""}
    Request Time: ${item?.date_added || ""}
  `;
    navigator.clipboard
      .writeText(formattedText)
      .then(() => {
        toast.success("All data copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleNavigate = (username, link) => {
    localStorage.setItem("downLineId", username);
    navigate(`/${link}`);
  };

  return (
    <div className="card">
      {showPendingWithdraw && (
        <EditPendingWithdraw
          refetchAllWithdraw={refetchAllWithdraw}
          editPendingWithdraw={showPendingWithdraw}
          setEditPendingWithdraw={setShowPendingWithdraw}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h5 className="card-header">{title}</h5>
          {title === "Pending Withdraw" && (
            <>
              <input
                style={{ width: "200px" }}
                onChange={(e) => setAmountFrom(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter From Amount"
              />
              <input
                style={{ width: "200px" }}
                onChange={(e) => setAmountTo(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Enter To Amount"
              />
            </>
          )}
        </div>
        {meta && (
          <Pagination
            prev
            next
            size="md"
            total={meta?.totalRecords}
            limit={meta?.recordsPerPage}
            activePage={activePage}
            onChangePage={setActivePage}
            maxButtons={5}
            ellipsis
            boundaryLinks
          />
        )}
      </div>
      <div className="table-responsive text-nowrap">
        <table className="table table-hover table-sm">
          <thead className="table-dark">
            <tr>
              <th>User Id</th>
              <th>Login Name</th>
              {adminRole === AdminRole.admin_staff ||
              adminRole === AdminRole.hyper_master ||
              adminRole === AdminRole.super_master ? (
                <th>Branch Name</th>
              ) : null}
              {/* <th>Username</th> */}
              <th>Amount</th>
              {/* <th>Mobile</th> */}

              <th>Bank Account Name</th>
              <th>Account Number</th>
              <th>Bank Name</th>
              <th>IFSC</th>
              <th>UPI ID</th>
              <th>Status</th>
              <th>Request Time</th>
              {time && <th>{time}</th>}
              {title === "Pending Withdraw" &&
              (adminRole === "master" || adminRole === "branch_staff") ? (
                <th>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {Array.isArray(data) &&
              data?.map((item, i) => {
                // console.log(data);
                return (
                  <tr style={{ background: item?.bgcolor || "none" }} key={i}>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.userId);
                        setRefetchViewClient(true);
                        navigate(
                          `/view-client?role=${adminRole}&history=withdraw`
                        );
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: clientColor?.[item?.color],
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      />
                      <strong> {item?.userId}</strong>
                    </td>
                    <td>{item?.loginnameVisible && item?.loginname}</td>
                    {adminRole === AdminRole.admin_staff ||
                    adminRole === AdminRole.hyper_master ||
                    adminRole === AdminRole.super_master ? (
                      <td>{item?.branch_name}</td>
                    ) : null}
                    {/* <td
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setClientId(item?.loginname);
                        setRefetchViewClient(true);
                        navigate("/view-client");
                      }}
                    >
                      {handleSplitUserName(item?.loginname)}
                    </td> */}
                    <td>{item?.amount}</td>

                    {/* <td>{item?.mobile}</td> */}
                    <td>
                      {item?.bank_account_name}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(
                              item?.bank_account_name,
                              setMessage
                            )
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item?.account_number}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleCopyToClipBoard(
                              item?.account_number,
                              setMessage
                            )
                          }
                        />
                      )}
                    </td>
                    <td>
                      {item?.bank_name}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          onClick={() =>
                            handleCopyToClipBoard(item?.bank_name, setMessage)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </td>
                    <td>
                      {item?.ifsc}{" "}
                      {location.pathname === "/pending-withdraw" && (
                        <MdOutlineContentCopy
                          onClick={() =>
                            handleCopyToClipBoard(item?.ifsc, setMessage)
                          }
                          style={{ cursor: "pointer" }}
                        />
                      )}{" "}
                    </td>
                    <td>{item?.upi_id}</td>
                    <td>
                      <span
                        className={`badge me-1
                      ${item?.status === "PENDING" ? "bg-label-warning" : ""}
                      ${item?.status === "APPROVED" ? "bg-label-success" : ""}
                      ${item?.status === "REJECTED" ? "bg-label-danger" : ""}
                      `}
                      >
                        {item?.status}
                      </span>
                    </td>

                    <td>{item?.date_added}</td>
                    {time && <td>{item?.date_modified}</td>}
                    {item?.status === "PENDING" &&
                    (adminRole === "master" || adminRole === "branch_staff") ? (
                      <>
                        <td>
                          <a
                            title="Text Edit"
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && setDownLineId(item?.withdraw_id);
                              !readOnly && setShowPendingWithdraw(true);
                            }}
                            className="btn btn-icon btn-sm btn-success"
                          >
                            <i className="bx bxs-edit"></i>
                          </a>
                          &nbsp;
                          <a
                            title="Copy All"
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && handleCopy(item);
                            }}
                            className="btn btn-icon btn-sm btn-primary"
                          >
                            <FaRegCopy size={15} />
                          </a>
                          &nbsp;
                          <a
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly &&
                                handleNavigate(item?.loginname, "pnl");
                            }}
                            className="btn btn-icon btn-sm btn-warning"
                          >
                            PL
                          </a>
                        </td>
                      </>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isLoading && !isSuccess && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "20px",
            }}
          >
            <Loader />
          </div>
        )}
        {meta && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Pagination
              prev
              next
              size="md"
              total={meta?.totalRecords}
              limit={meta?.recordsPerPage}
              activePage={activePage}
              onChangePage={setActivePage}
              maxButtons={5}
              ellipsis
              boundaryLinks
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
