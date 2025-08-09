import { useNavigate } from "react-router-dom";
import useGetMarketAnalysis from "../../../hooks/HyperMaster/Exposure/useGetMarketAnalysis";

const MarketAnalysis = () => {
  const navigate = useNavigate();
  const { marketAnalysis } = useGetMarketAnalysis();
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Market Analysis</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover table-sm">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "200px" }}>Date</th>
                <th>Event Name</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {marketAnalysis?.map((market, i) => {
                return (
                  <tr
                    onClick={() => {
                      navigate(
                        `/game-details/${market?.eventTypeId}/${market?.eventId}`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                    key={i}
                  >
                    <td>{market?.eventDate}</td>
                    <td>{market?.eventName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
