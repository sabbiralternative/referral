import Swal from "sweetalert2";
import useGetPaymentMethod from "../../../hooks/Master/Client/useGetPaymentMethod";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";
import useContextState from "../../../hooks/useContextState";
import toast from "react-hot-toast";
import { useState } from "react";
import ShowImage from "../../../components/modal/ShowImage";
import { AdminRole } from "../../../constant/constant";

const ViewPaymentMethod = () => {
  const [showPaymentImage, setShowPaymentImage] = useState(false);
  const [image, setImage] = useState("");
  const { token, setShowEditPayment, setDownLineId, readOnly, adminRole } =
    useContextState();
  const payload = {
    type: "viewPaymentMethods",
  };
  const { paymentsMethods, refetchPaymentMethods } =
    useGetPaymentMethod(payload);

  /* delete payments method */
  const handleDeletePaymentMethod = async (paymentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const generatedToken = handleRandomToken();
        const payload = {
          type: "deletePayment",
          paymentId,
          token: generatedToken,
        };
        const res = await axios.post(API.payments, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.success) {
          refetchPaymentMethods();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error?.status?.[0]?.description);
        }
      }
    });
  };

  return (
    <>
      {showPaymentImage && (
        <ShowImage image={image} setShowImage={setShowPaymentImage} />
      )}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="card">
          <h5 className="card-header">Payment Methods</h5>
          <div className="table-responsive text-nowrap">
            <table className="table table-hover table-sm">
              <thead className="table-dark">
                <tr>
                  <th>Type</th>
                  {adminRole === AdminRole.admin_staff && <th>Branch name</th>}
                  <th>Account name</th>
                  <th>Image</th>
                  <th>Limits</th>

                  <th>status</th>
                  {adminRole !== AdminRole.admin_staff && <th>Action</th>}
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {paymentsMethods?.map((method, i) => {
                  return (
                    <tr key={i}>
                      <td>{method?.type}</td>
                      {adminRole === AdminRole.admin_staff && (
                        <td>{method?.branchName}</td>
                      )}

                      <td>{method?.name}</td>
                      <td>
                        {method?.image && (
                          <img
                            onClick={() => {
                              setImage("");
                              setShowPaymentImage(true);
                              setImage(method?.image);
                            }}
                            style={{
                              height: "40px",
                              width: "40px",
                              objectFit: "contain",
                              cursor: "pointer",
                            }}
                            src={method?.image}
                            alt=""
                          />
                        )}
                      </td>

                      <td>
                        Rs.{method?.minAmount}-{method?.maxAmount}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            method?.status == 1
                              ? "bg-label-primary"
                              : "bg-label-warning"
                          } me-1`}
                        >
                          {method?.status == 1 ? "Active" : "inactive"}
                        </span>
                      </td>
                      {adminRole !== AdminRole.admin_staff && (
                        <td>
                          <a
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            onClick={() => {
                              !readOnly && setDownLineId(method?.id);
                              !readOnly && setShowEditPayment(true);
                            }}
                            className="btn btn-icon btn-sm btn-success"
                          >
                            <i className="bx bxs-edit"></i>
                          </a>
                          &nbsp;
                          <a
                            onClick={() => {
                              !readOnly &&
                                handleDeletePaymentMethod(method?.id);
                            }}
                            style={{
                              color: "white",
                              cursor: `${
                                !readOnly ? "pointer" : "not-allowed"
                              }`,
                            }}
                            className="btn btn-icon btn-sm btn-danger"
                          >
                            <i className="bx bxs-checkbox-minus"></i>
                          </a>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPaymentMethod;
