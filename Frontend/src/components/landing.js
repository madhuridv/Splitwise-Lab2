import React from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import landing from "./landing.PNG";
import { Component } from "react";

// export  const Landing = () => {
//   return (
//     <div className="landing">
//       <Header />

//       <main>
//         <NavBar />
//       </main>
//       <div className="landing">
//             <img className="landing-logo" src={landing} alt="Logo" width ="100%" />
//         </div>
//     </div>
//   );
// };

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Header />

        <main>
          <NavBar />
        </main>
        <div className="landing">
          <img className="landing-logo" src={landing} alt="Logo" width="100%" />
        </div>
      </div>
    );
  }
}

export default Landing;
