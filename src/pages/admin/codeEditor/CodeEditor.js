import React from "react";
import Tabs from "../../../components/tabs/Tabs";
import Banner from "../../../components/banner/Banner";

const CodeEditor = props => {
  const tabcontent = props.children;

  const tablist = tabcontent.map((tab, idx) => {
      return { title: tab.props.name, key: tab.props.name, link: tab };
  });
    const showBanner = () => {
        return false;
    };

    return (
        <>
            <Banner
                id="banner"
                styleName="warning"
                text="Something has happened."
                defaultState={showBanner}
            />
            <Tabs tabs={tablist} />
        </>
  );
};

export default CodeEditor;
