/** @format */
import classes from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes/constants";
import logo from "../../icons/logo/Untitled_logo_8_free-file.jpg";
import violinIcon from "../../icons/logo/picmix.com_2396092.png";
import violinIcon2 from "../../icons/logo/pngegg (14).png";
import noteIcon from "../../icons/logo/pngegg (15).png";

const Menu = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const renderItem = (path: string, name: string, icon: string) => {
    return (
      <div
        className={location === path ? classes.activeItem : classes.item}
        key={name}
        onClick={() => navigate(path)}
      >
        <img src={icon} alt="" />
        {/* <div className={classes.imageWrapper}></div> */}
        <div className={classes.name}>{name}</div>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.logoContainer}>
        <img className={classes.logoIcon} src={noteIcon} alt="" />
        <span className={classes.logo}>MUZa</span>
      </div>
      <div className={classes.container}>
        {routes.map((item) => renderItem(item.path, item.name, item.icon))}
      </div>
    </div>
  );
};

export default Menu;
