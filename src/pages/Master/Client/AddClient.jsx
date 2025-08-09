import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useContextState from "../../../hooks/useContextState";
import handleRandomToken from "../../../utils/handleRandomToken";
import axios from "axios";
import { API } from "../../../api";
import toast from "react-hot-toast";
import { useWhiteLabel } from "../../../hooks/AdminMaster/whiteLabel";
import { useState } from "react";

const AddClient = () => {
  const [disabled, setDisabled] = useState(false);
  const { data } = useWhiteLabel({
    type: "viewWhitelabelByBranch",
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { token } = useContextState();

  /* handle add client */
  const onSubmit = async (values) => {
    setDisabled(true);
    const generatedToken = handleRandomToken();
    const payload = {
      ...values,
      token: generatedToken,
    };

    const res = await axios.post(API.registerPanel, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    if (data?.success) {
      setDisabled(false);
      toast.success("Client added successfully");
      reset();
      navigate("/view-client");
    } else {
      setDisabled(false);
      toast.error(data?.error?.description);
    }
  };

  console.log(errors);
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 breadcrumb-wrapper mb-4">
        <span className="text-muted fw-light">Home /</span> Add Client
      </h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {data?.result?.length > 0 && (
                  <div className="row mb-3" id="bank_account_name_div">
                    <label
                      className="col-sm-2 col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Site *
                    </label>
                    <div className="col-sm-10">
                      <select
                        defaultValue=""
                        {...register("site", {
                          required: true,
                        })}
                        className="form-control"
                      >
                        <option disabled value="">
                          Select Site
                        </option>
                        {data?.result?.map((site) => (
                          <option key={site?.site_url} value={site?.site_url}>
                            {site?.site_url}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Username *
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("username", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Password *
                  </label>
                  <div className="col-sm-10" style={{ position: "relative" }}>
                    <input
                      type="text"
                      {...register("password", {
                        required: true,
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                    <button
                      type="button"
                      onClick={() => reset({ password: "Abcd1234" })}
                      style={{
                        position: "absolute",
                        top: "7px",
                        right: "20px",
                      }}
                      className="btn btn-primary btn-xs"
                    >
                      Default Password
                    </button>
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Mobile
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      {...register("mobile")}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>

                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Remark
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("remark")}
                      className="form-control"
                      id="basic-default-name"
                    />
                  </div>
                </div>
                <div className="row mb-3" id="bank_account_name_div">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="basic-default-name"
                  >
                    Transaction Code
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      {...register("transaction_code", {
                        required: "Transaction code is required",
                      })}
                      className="form-control"
                      id="basic-default-name"
                    />
                    {errors.transaction_code && (
                      <p className="text-danger">
                        {errors.transaction_code.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <input
                      disabled={disabled}
                      type="submit"
                      name="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
