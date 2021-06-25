import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./Context/Auth-Context";

const App = (props) => {
    const authContext = useContext(AuthContext);

    let content = "";

    if (authContext.isAuth) {
        content = <Ingredients></Ingredients>;
    } else content = <Auth loginHandler={AuthContext.login}/>;

    return content;
};

export default App;
