import { AdminRole } from "../../../../../constant/constant";
import { Link } from "react-router-dom";

const OtherRoleAction = ({
  adminRole,
  readOnly,
  handleNavigate,
  handleOpenModal,
  client,
  setClientDeposit,
  setDirectDeposit,
  setDirectWithdraw,
  setShowChangePassword,
  setShowChangeStatus,
  setShowCreditRef,
  showMore,
  i,
  handleShowMore,
  showMoreRef,
  setShowColor,
  setShowChangeBranch,
}) => {
  return (
    <td>
      {adminRole !== "hyper_master" && adminRole !== "admin_staff" && (
        <>
          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
            }}
            onClick={() =>
              handleOpenModal(
                setClientDeposit,
                client?.username,
                client?.role,
                client?.downlineId
              )
            }
            className="btn btn-icon btn-sm btn-success"
          >
            D
          </a>
          &nbsp;
          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
            }}
            onClick={() => {
              handleOpenModal(
                setDirectWithdraw,
                client?.username,
                client?.role,
                client?.downlineId
              );
            }}
            className="btn btn-icon btn-sm btn-danger"
          >
            W
          </a>
          &nbsp;
        </>
      )}
      <a
        style={{
          color: "white",
          cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
        }}
        onClick={() => handleNavigate(client)}
        className="btn btn-icon btn-sm btn-warning"
      >
        PL
      </a>
      {adminRole !== AdminRole.master && (
        <>
          &nbsp;
          <a
            style={{ color: "white" }}
            onClick={() => {
              handleOpenModal(
                setShowChangePassword,
                client?.username,
                client?.role,
                client?.downlineId
              );
            }}
            className="btn btn-icon btn-sm btn-success"
          >
            P
          </a>
          &nbsp;
          {adminRole !== "admin_staff" && (
            <>
              <a
                style={{ color: "white" }}
                onClick={() => {
                  handleOpenModal(
                    setShowChangeStatus,
                    client?.username,
                    client?.role,
                    client?.downlineId
                  );
                }}
                className="btn btn-icon btn-sm btn-label-secondary"
              >
                S
              </a>
              &nbsp;
            </>
          )}
        </>
      )}
      {adminRole == AdminRole.hyper_master ||
      adminRole === AdminRole.admin_staff ? (
        <a
          style={{ color: "white" }}
          onClick={() => {
            handleOpenModal(
              setShowChangeBranch,
              client?.username,
              client?.role,
              client?.downlineId
            );
          }}
          className="btn btn-icon btn-sm btn-danger"
        >
          M
        </a>
      ) : null}
      {adminRole !== "hyper_master" && adminRole !== "admin_staff" && (
        <>
          &nbsp;
          <a
            style={{
              color: "white",
              cursor: `${!readOnly ? "pointer" : "not-allowed"}`,
            }}
            onClick={() => {
              handleOpenModal(
                setDirectDeposit,
                client?.username,
                client?.role,
                client?.downlineId
              );
            }}
            className="btn btn-icon btn-sm btn-success"
          >
            DD
          </a>
        </>
      )}
      &nbsp;
      {adminRole === "master" || adminRole === AdminRole.branch_staff ? (
        <div className="btn-group">
          <button
            onClick={() => handleShowMore(i)}
            style={{
              height: "auto",
              width: "auto",
              padding: "0px 2px",
            }}
            type="button"
            className="btn btn-primary btn-icon  dropdown-toggle hide-arrow"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>

          {i === showMore && (
            <div
              style={{
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                zIndex: 999,
              }}
            />
          )}
          {i === showMore && (
            <ul
              ref={showMoreRef}
              style={{
                display: "block",
                position: "absolute",
                right: "0px",
                top: "25px",
                zIndex: 9999,
              }}
              className="dropdown-menu dropdown-menu-end"
            >
              <li>
                <Link
                  to={`/activity-logs?role=${client?.role}&id=${client?.userId}`}
                  className="dropdown-item"
                >
                  Activity Logs
                </Link>
              </li>
              <li
                onClick={() => {
                  handleOpenModal(
                    setShowColor,
                    client?.username,
                    client?.role,
                    client?.downlineId
                  );
                }}
              >
                <a className="dropdown-item">Client Group</a>
              </li>
              {adminRole !== "admin_staff" && (
                <>
                  <li
                    onClick={() => {
                      handleOpenModal(
                        setShowChangePassword,
                        client?.username,
                        client?.role,
                        client?.downlineId
                      );
                    }}
                  >
                    <a className="dropdown-item">Change Password</a>
                  </li>
                  <li
                    onClick={() => {
                      handleOpenModal(
                        setShowChangeStatus,
                        client?.username,
                        client?.role,
                        client?.downlineId
                      );
                    }}
                  >
                    <a className="dropdown-item">Change Status</a>
                  </li>
                </>
              )}
              {adminRole !== "hyper_master" && adminRole !== "admin_staff" && (
                <li
                  onClick={() => {
                    handleOpenModal(
                      setShowCreditRef,
                      client?.username,
                      client?.role,
                      client?.downlineId
                    );
                  }}
                >
                  <a className="dropdown-item">Credit Reference</a>
                </li>
              )}
            </ul>
          )}
        </div>
      ) : null}
    </td>
  );
};

export default OtherRoleAction;
