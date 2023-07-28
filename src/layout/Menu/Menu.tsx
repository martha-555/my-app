/** @format */
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/constants";

const Menu = () => {
  const navigate = useNavigate();
  const renderItem = (path: string, name: string) => {
    return (
      <div className={classes.item} key={name} onClick={() => navigate(path)}>
        {name}
      </div>
    );
  };

  return (
    <div>
      <div className={classes.container}>
        {routes.map((item) => renderItem(item.path, item.name))}
      </div>
    </div>
  );
};

export default Menu;
