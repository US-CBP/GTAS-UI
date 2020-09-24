import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/header/Header";
import LangModal from "./LangModal";
import { LiveEditContext } from "../../context/translation/LiveEditContext";
import { hasData } from "../../utils/utils";

const Home = props => {
  const location = props.location?.pathname;
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => setShowModal(false);
  const [xid, setXid] = useState();
  const { getLiveEditState, action, EditModal } = useContext(LiveEditContext);

  useEffect(() => {
    const isEdit = getLiveEditState();
    setShowModal(isEdit);
  }, []);
  // const handleClick = ev => {
  //   // show modal with this xid
  //   ev.preventDefault();
  //   // console.log(ev.target.attributes);

  //   const id = ev.target.attributes["xid"]?.value;

  //   if (hasData(id)) {
  //     setXid(id);
  //     setShowModal(true);
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(function() {
  //     //Start the timer
  //     const xids = document.querySelectorAll("[xid]");

  //     Array.from(xids).forEach(item => {
  //       item.classList.add("xid");
  //       item.addEventListener("click", handleClick);
  //     });
  //   }, 1000);
  // }, [location]);

  return (
    <div>
      <Header></Header>
      {props.children}
      {EditModal}
      {/* <LangModal show={showModal} onHide={hideModal} elem={{ xid: "foo" }}></LangModal> */}
    </div>
  );
};

export default Home;
