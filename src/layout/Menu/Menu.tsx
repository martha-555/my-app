/** @format */
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/constants";

const Menu = () => {

  const navigate = useNavigate();
  const renderItem = (path: string, name: string) => {
    return (
      
      <div className={classes.group} key={name} onClick={() => navigate(path)}>
       
      
            <div className={classes.rectangle1}>  
            <div className={classes.rectangle2}>
              <div className={classes.rectangle3}>
                <div className={classes.rectangle4}>
                  <div className={classes.rectangle5}> 
                  <div className={classes.ellipse}>
                    <div className={classes.group9}>
                       <div className={classes.home}>   
                       <div className={classes.home2}>{name}</div>
                       </div>
                       </div>
                    </div>
                  </div>
                 </div>
                </div>
              </div>
          </div>
     
        
      </div>
    );
  };

  return (
      <div className={classes.container}>
        {routes.map((item) => renderItem(item.path, item.name))}
    </div>
  );
};

export default Menu;
