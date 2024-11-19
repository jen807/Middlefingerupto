import { HashRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import PageNotFound from "./PageNotFound";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
