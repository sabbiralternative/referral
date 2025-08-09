import { useNavigate, useLocation } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import { useEffect, useState } from "react";
import Slip from "../../modal/Master/Deposit/Slip";
import toast from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
// import { handleSplitUserName } from "../../../utils/handleSplitUserName";
import { Pagination } from "rsuite";
import { AdminRole, clientColor } from "../../../constant/constant";
import Loader from "../Loader/Loader";

const Deposit = ({
  data,
  title,
  time,
  setActivePage,
  meta,
  activePage,
  isLoading,
  isSuccess,
}) => {
  const {
    setEditPendingDeposit,
    setDownLineId,
    setClientId,
    setRefetchViewClient,
    readOnly,
    adminRole,
  } = useContextState();
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (message) {
      toast.success(message);
      setMessage("");
    }
  }, [message]);

  return (
    <div className="card">
      {showImage && <Slip setShowImage={setShowImage} image={image} />}
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h5>{title}</h5>
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
              <th>UTR</th>
              <th>Slip</th>
              <th>Type</th>
              <th>Status</th>
              <th>Remark</th>
              <th>Site</th>
              <th>Request Time</th>
              {time && <th>{time}</th>}
              {title === "Pending Deposit" && adminRole === "master" && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data?.map((item, i) => {
              return (
                <tr style={{ background: item?.bgcolor || "none" }} key={i}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setClientId(item?.userId);
                      setRefetchViewClient(true);
                      navigate(
                        `/view-client?role=${adminRole}&history=deposit`
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

                  <td>
                    {item?.utr}{" "}
                    {location.pathname === "/pending-deposit" && (
                      <MdOutlineContentCopy
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleCopyToClipBoard(item?.utr, setMessage)
                        }
                      />
                    )}
                  </td>
                  <td>
                    {item?.image ? (
                      <span
                        onClick={() => {
                          setShowImage(true);
                          setImage(item?.image);
                        }}
                        style={{ color: "#346cee", cursor: "pointer" }}
                      >
                        View
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{item?.type}</td>
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
                  <td>{item?.remark}</td>
                  <td>{item?.site}</td>
                  <td>{item?.date_added}</td>
                  {time && <td>{item?.date_modified}</td>}
                  {item?.status === "PENDING" && adminRole === "master" && (
                    <td>
                      <a
                        style={{
                          color: "white",
                          cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
                        }}
                        onClick={() => {
                          !readOnly && setDownLineId(item?.id);
                          !readOnly && setEditPendingDeposit(true);
                        }}
                        className="btn btn-icon btn-sm btn-success"
                      >
                        <i className="bx bxs-edit"></i>
                      </a>
                    </td>
                  )}
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

export default Deposit;
