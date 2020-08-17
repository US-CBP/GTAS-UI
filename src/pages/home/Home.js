import React from "react";
import Header from "../../components/header/Header";

const Home = props => (
  <div>
    <Header></Header>
    <div>{props.children}</div>
  </div>
);

export default Home;
