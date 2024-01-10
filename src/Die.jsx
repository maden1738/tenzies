import React from "react";
import Dot from "./Dot";

export default function Die(props) {
       const styles = {
              backgroundColor: props.isHeld ? "#59E391" : "white",
       };
       return (
              <div
                     className={`die-face die-${props.value}`}
                     style={styles}
                     onClick={props.holdDice}
              >
                     {/* <h2 className="die-num">{props.value}</h2> */}
                     {Array(props.value)
                            .fill(0)
                            .map((el) => (
                                   <Dot />
                            ))}
              </div>
       );
}
