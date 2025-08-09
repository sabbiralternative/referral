import HyperMaster from "./Role/HyperMaster";
import Master from "./Role/Master";
import useContextState from "../../../hooks/useContextState";

const NavListItem = () => {
  const { adminRole } = useContextState();
  // a23moneyadmin hyper_master
  // a23branch1

  return (
    <aside
      id="layout-menu"
      className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0 "
      style={{ touchAction: "none", userSelect: "none" }}
      //   -webkit-user-drag: none;
      //   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      // "
      // data-bg-className="bg-menu-theme"
    >
      <div className="container-xxl d-flex h-100">
        <a className="menu-horizontal-prev d-none"></a>
        <div className="menu-horizontal-wrapper">
          {adminRole === "referral" ? <HyperMaster /> : null}
          {adminRole === "master" ||
          adminRole === "admin_staff" ||
          adminRole === "branch_staff" ? (
            <Master />
          ) : null}
        </div>
        <a className="menu-horizontal-next d-none"></a>
      </div>
    </aside>
  );
};

export default NavListItem;
