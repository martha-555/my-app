/** @format */
import classes from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../routes/constants";
import logo from '../../icons/logo/Untitled_logo_8_free-file.jpg'


const Menu = () => {

const location = useLocation().pathname;
  const navigate = useNavigate();

  const renderItem = (path: string, name: string, icon: string) => {
    return (
      <div className={location === path? classes.activeItem : classes.item} key={name} onClick={() => navigate(path)}>
        <div className={classes.imageWrapper} >
       <img src={icon} alt="" />
        </div>
       <div className={classes.name}>{name}</div>
      </div>
    );
  };

  return (
    <div >
<div className={classes.logo}>MUZa </div>
      <div className={classes.container}>
        {routes.map((item) => renderItem(item.path, item.name, item.icon))}
   
    </div>
    </div>
  );
};

export default Menu;
