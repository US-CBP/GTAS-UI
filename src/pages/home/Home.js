import React, { useEffect } from "react";
import Header from "../../components/header/Header";

const Home = props => {
  const location = props.location?.pathname;

  console.log(location);
  useEffect(() => {
    setTimeout(function() {
      //Start the timer
      // const foos = document.getElementsByClassName("foo");
      const foos = document.querySelectorAll("[xid]");

      Array.from(foos).forEach(item => {
        item.classList.add("xl8-notfound");
        item.addEventListener("click", function(e) {
          console.log(e);
        });
      });
      // console.log("HOME RAN, foo class elements: ", foos);
    }, 1000);
  }, [location]);

  return (
    <div>
      <Header></Header>
      {props.children}
    </div>
  );
};

export default Home;
