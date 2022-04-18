import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./pages/Main";
import { RecoilRoot } from "recoil";
import "./assets/global.scss";

const container = document.getElementById("root");

if (container == null) {
  throw new Error("root 컨테이너가 없습니다");
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  </React.StrictMode>
);
