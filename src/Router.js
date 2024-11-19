import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import PageNotFound from "./PageNotFound";

const Router = () => {
  <HashRouter>
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/*" element={<PageNotFound />}></Route>
    </Routes>
  </HashRouter>;
};

export default Router;
