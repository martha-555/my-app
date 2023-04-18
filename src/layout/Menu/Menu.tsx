/** @format */
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/constants";
import { useState } from "react";
import classNames from "classnames";

const Menu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();
  const renderItem = (path: string, name: string) => {
    return (
      <div
        className={isSidebarOpen ? classes.openMenu : classes.closedMenu}
        key={name}
        onClick={() => navigate(path)}
      >
        {name}
      </div>
    );
  };

  return (
    <div>
      <button className={classes.menuButton} onClick={handleToggleSidebar}>
        +
      </button>
      <div
        className={classNames(
          classes.container,
          isSidebarOpen ? classes.open : classes.closed
        )}
      >
        {routes.map((item) => renderItem(item.path, item.name))}
      </div>
    </div>
  );
};

export default Menu;
