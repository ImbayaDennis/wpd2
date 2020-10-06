import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Navmenu from './Navmenu';



const Header = (props) =>{

    //const [back, setBack] = useState(false);   
    const [menu, setMenu] = useState(false);

    const toggleMenu = ()=>{
        setMenu(!menu)
    }

    let bk_btn;
    if(props.back){
        bk_btn = (
            <Link to={props.prev_pg} className="br-2">
                <div className="back-btn">
                    <div className="bar-a"></div>
                    <div className="bar-b"></div>
                    <div className="bar-c"></div>
                </div>
            </Link>
        );
    }
    else{
        bk_btn = (<div></div>);
    }

    React.useEffect(() => {
        function getWidth() {
          if(window.innerWidth > 760){
              //console.log("Desktop");
          }
          else{
              //console.log("Mobile");
          }     
        }
        window.addEventListener('resize', getWidth);

        return _ => {
            window.removeEventListener('resize', getWidth);
        }
      });

      let change;

      if(!menu){
          change = "";
      }
      else{
          change = "change";
      }

    return(
        <div className="header">
            <Navmenu close={menu} />
            <nav>
                {bk_btn}

                <h2>{props.title}</h2>

                <Link to='#' className="br-2" onClick={toggleMenu}>
                    <div className="burger-bars">
                       <div id={change+"1"} className={"bar-1"}></div>
                       <div id={change+"2"} className={"bar-2"}></div>
                       <div id={change+"3"} className={"bar-3"}></div>
                    </div>
                </Link>
            </nav>
        </div>
    );
}

export default Header;