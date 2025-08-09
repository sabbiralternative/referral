import useCurrentBets from "../../../hooks/useCurrentBets";

const CurrentBets = () => {
  const { currentBets } = useCurrentBets();
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h4 className="card-header">Current Bets</h4>
        <div className="row">
          <div className="col-xl-12">
            <div className="table-responsive mt-4 mt-xl-0">
              <table className="table table-hover table-striped align-middle table-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col">Event Type</th>
                    <th scope="col">Event Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">M Name</th>
                    <th scope="col">Nation</th>
                    <th scope="col">U Rate</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Place Date</th>
                    <th scope="col">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBets?.map((betData, i) => {
                    return (
                      <tr
                        key={i}
                        className={`${
                          betData?.betType === "Back" ? "BACK" : "LAY"
                        }`}
                      >
                        <td style={{ color: "black" }} className="fw-medium">
                          {" "}
                          {betData?.sports}
                        </td>
                        <td style={{ color: "black" }}>
                          {" "}
                          {betData?.eventName}
                        </td>
                        <td style={{ color: "black" }}> {betData?.username}</td>
                        <td style={{ color: "black" }}>
                          {" "}
                          {betData?.marketName}
                        </td>
                        <td style={{ color: "black" }}>{betData?.nation}</td>
                        <td style={{ color: "black" }}>{betData?.userRate}</td>
                        <td style={{ color: "black" }}>{betData?.amount}</td>
                        <td style={{ color: "black" }}>{betData?.placeDate}</td>
                        <td style={{ color: "black" }}>{betData?.ipAddress}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBets;
