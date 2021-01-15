// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useState, useEffect, useRef } from "react";
import { Tabs as RBTabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import "./ChromeTabs.css";

const ChromeTabs = props => {
  const [key, setKey] = useState(0);
  const tabsRef = useRef(null);
  let instanceId = 1;

  console.log(props.tabs);

  const initTabList = props.tabs.map(tab => {
    return (
      <Tab
        eventKey={tab.titleText}
        key={tab.titleText}
        data-chrome-tabs-instance-id={instanceId++}
        {...tab}
      >
        <div
          class="chrome-tab"
          eventKey={tab.titleText}
          key={tab.titleText}
          data-chrome-tabs-instance-id={instanceId++}
        >
          <div class="chrome-tab-dividers"></div>
          <div class="chrome-tab-background"></div>
          <div class="chrome-tab-content">
            {/* <div class="chrome-tab-favicon"></div> */}
            <div class="chrome-tab-title">{tab.titleText}</div>
            <div class="chrome-tab-drag-handle"></div>
            {/* <div class="chrome-tab-close"></div> */}
          </div>
        </div>
      </Tab>

      // <div
      //   class="chrome-tab"
      //   eventKey={tab.titleText}
      //   key={tab.titleText}
      //   data-chrome-tabs-instance-id={instanceId++}
      // >
      //   <div class="chrome-tab-dividers"></div>
      //   <div class="chrome-tab-background"></div>
      //   <div class="chrome-tab-content">
      //     <div class="chrome-tab-favicon"></div>
      //     <div class="chrome-tab-title">{tab.titleText}</div>
      //     <div class="chrome-tab-drag-handle"></div>
      //     <div class="chrome-tab-close"></div>
      //   </div>
      // </div>
    );
  });

  const [tabContentWidths, setTabContentWidths] = useState([
    100,
    100,
    100,
    100,
    100,
    100
  ]);
  const [tabList, setTabList] = useState(initTabList);

  const TAB_CONTENT_MARGIN = 9;
  const TAB_CONTENT_OVERLAP_DISTANCE = 1;

  const TAB_OVERLAP_DISTANCE = TAB_CONTENT_MARGIN * 2 + TAB_CONTENT_OVERLAP_DISTANCE;

  const TAB_CONTENT_MIN_WIDTH = 24;
  const TAB_CONTENT_MAX_WIDTH = 240;

  const TAB_SIZE_SMALL = 84;
  const TAB_SIZE_SMALLER = 60;
  const TAB_SIZE_MINI = 48;

  const getActiveTabEl = () => {
    // return this.el.querySelector(".chrome-tab[active]");
  };

  const hasActiveTab = () => {
    // return !!this.activeTabEl;
  };

  const setCurrentTab = tabEl => {
    // const activeTabEl = this.activeTabEl;
    // if (activeTabEl === tabEl) return;
    // if (activeTabEl) activeTabEl.removeAttribute("active");
    // tabEl.setAttribute("active", "");
    // this.emit("activeTabChange", { tabEl });
  };

  // const setupCustomProperties = () => {
  //   // this.el.style.setProperty("--tab-content-margin", `${TAB_CONTENT_MARGIN}px`);
  // };

  // const setupStyleEl = () => {
  //   // this.styleEl = document.createElement("style");
  //   // this.el.appendChild(this.styleEl);
  // };

  const removeEvents = () => {
    window.removeEventListener("resize", debounce);
  };

  const setupEvents = () => {
    window.addEventListener("resize", debounce);
  };

  const getTabContentWidths = () => {
    console.log(tabsRef.current);

    const numberOfTabs = 6;
    const tabsContentWidth = (tabsRef.current ?? {}).clientWidth;
    const tabsCumulativeOverlappedWidth =
      (numberOfTabs - 1) * TAB_CONTENT_OVERLAP_DISTANCE;
    const targetWidth =
      (tabsContentWidth - 2 * TAB_CONTENT_MARGIN + tabsCumulativeOverlappedWidth) /
      numberOfTabs;
    const clampedTargetWidth = Math.max(
      TAB_CONTENT_MIN_WIDTH,
      Math.min(TAB_CONTENT_MAX_WIDTH, targetWidth)
    );
    const flooredClampedTargetWidth = Math.floor(clampedTargetWidth);
    const totalTabsWidthUsingTarget =
      flooredClampedTargetWidth * numberOfTabs +
      2 * TAB_CONTENT_MARGIN -
      tabsCumulativeOverlappedWidth;
    const totalExtraWidthDueToFlooring = tabsContentWidth - totalTabsWidthUsingTarget;
    // // TODO - Support tabs with different widths / e.g. "pinned" tabs
    const widths = [];
    let extraWidthRemaining = totalExtraWidthDueToFlooring;
    for (let i = 0; i < numberOfTabs; i += 1) {
      const extraWidth =
        flooredClampedTargetWidth < TAB_CONTENT_MAX_WIDTH && extraWidthRemaining > 0
          ? 1
          : 0;
      widths.push(flooredClampedTargetWidth + extraWidth);
      if (extraWidthRemaining > 0) extraWidthRemaining -= 1;
    }
    setTabContentWidths(widths);
    return widths;
  };

  const getTabContentPositions = () => {
    const positions = [];
    const tcwidths = getTabContentWidths();
    let position = TAB_CONTENT_MARGIN;
    tcwidths.forEach((width, i) => {
      const offset = i * TAB_CONTENT_OVERLAP_DISTANCE;
      positions.push(position - offset);
      position += width;
    });
    return positions;
  };

  const getTabPositions = () => {
    const positions = [];
    getTabContentPositions().forEach(contentPosition => {
      positions.push(contentPosition - TAB_CONTENT_MARGIN);
    });
    return positions;
  };

  const debounce = () => {
    var timer;
    return function(event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(layoutTabs, 200, event);
    };
  };

  const layoutTabs = () => {
    console.log("layout@");
    let idx = 2;

    const tabContentWidths = getTabContentWidths();
    const positions = getTabPositions();

    let updatedTabCollection = [];

    const moreUpdated = [
      <a
        href="#"
        role="tab"
        data-rb-event-key="Summary"
        aria-selected="true"
        class="nav-item nav-link chrome-tab active"
        data-chrome-tabs-instance-id={1}
        style={{
          width: `${tabContentWidths[1] + 2 * TAB_CONTENT_MARGIN}px`,
          transform: `translate3d(${positions[1]}px, 0, 0)`
        }}
      >
        <div class="chrome-tab-title">
          <span xid="pd001">Summary</span>
        </div>
        <div class="chrome-tab-drag-handle"></div>
      </a>,
      <a
        href="#"
        role="tab"
        data-rb-event-key="APIS"
        tabindex="-1"
        aria-selected="false"
        class="nav-item nav-link chrome-tab"
        data-chrome-tabs-instance-id={2}
        style={{
          width: `${tabContentWidths[2] + 2 * TAB_CONTENT_MARGIN}px`,
          transform: `translate3d(${positions[2]}px, 0, 0)`
        }}
      >
        <div class="chrome-tab-title">
          <span xid="pd002">APIS</span>
        </div>
        <div class="chrome-tab-drag-handle"></div>
      </a>,
      <a
        href="#"
        role="tab"
        data-rb-event-key="PNR"
        tabindex="-1"
        aria-selected="false"
        class="nav-item nav-link chrome-tab"
        data-chrome-tabs-instance-id={3}
        style={{
          width: `${tabContentWidths[3] + 2 * TAB_CONTENT_MARGIN}px`,
          transform: `translate3d(${positions[3]}px, 0, 0)`
        }}
      >
        <div class="chrome-tab-title">
          <span xid="pd003">PNR</span>
        </div>
        <div class="chrome-tab-drag-handle"></div>
      </a>,
      <a
        href="#"
        role="tab"
        data-rb-event-key="Flight History"
        tabindex="-1"
        aria-selected="false"
        class="nav-item nav-link chrome-tab"
        data-chrome-tabs-instance-id={4}
        style={{
          width: `${tabContentWidths[4] + 2 * TAB_CONTENT_MARGIN}px`,
          transform: `translate3d(${positions[4]}px, 0, 0)`
        }}
      >
        <div class="chrome-tab-title">
          <span xid="pd004">Flight History</span>
        </div>
        <div class="chrome-tab-drag-handle"></div>
      </a>,
      <a
        href="#"
        role="tab"
        data-rb-event-key="Link Analysis"
        tabindex="-1"
        aria-selected="false"
        class="nav-item nav-link chrome-tab"
        data-chrome-tabs-instance-id={5}
        style={{
          width: `${tabContentWidths[5] + 2 * TAB_CONTENT_MARGIN}px`,
          transform: `translate3d(${positions[5]}px, 0, 0)`
        }}
      >
        <div class="chrome-tab-title">
          <span xid="pd005">Link Analysis</span>
        </div>
        <div class="chrome-tab-drag-handle"></div>
      </a>,
      <a
        href="#"
        role="tab"
        data-rb-event-key="Attachments"
        tabindex="-1"
        aria-selected="false"
        class="nav-item nav-link chrome-tab"
        data-chrome-tabs-instance-id={6}
        style={{
          width: `${tabContentWidths[6] + 2 * TAB_CONTENT_MARGIN}px`,
          transform: `translate3d(${positions[6]}px, 0, 0)`
        }}
      >
        <div class="chrome-tab-title">
          <span xid="pd006">Attachments</span>
        </div>
        <div class="chrome-tab-drag-handle"></div>
      </a>
    ];

    props.tabs.forEach((tab, i) => {
      const contentWidth = tabContentWidths[i];
      const width = contentWidth + 2 * TAB_CONTENT_MARGIN;

      const elStyle = {
        width: width + "px",
        transform: `translate3d(${positions[i]}px, 0, 0)`
      };

      const updatedTab = (
        // <div
        //   class="chrome-tab-content"
        //   eventKey={tabEl.titleText}
        //   key={tabEl.titleText}
        //   data-chrome-tabs-instance-id={idx++}
        //   style={elStyle}
        // >
        //   <div class="chrome-tab-favicon"></div>
        //   <div class="chrome-tab-title">{tabEl.titleText}</div>
        //   <div class="chrome-tab-drag-handle"></div>
        // </div>

        <Tab
          eventKey={tab.titleText}
          key={tab.titleText}
          data-chrome-tabs-instance-id={idx++}
          {...tab}
          style={elStyle}
          className="chrome-tab"
        >
          <div class="chrome-tab-dividers"></div>
          <div class="chrome-tab-background"></div>
          <div class="chrome-tab-content">
            {/* <div class="chrome-tab-favicon"></div> */}
            <div class="chrome-tab-title">{tab.titleText}</div>
            <div class="chrome-tab-drag-handle"></div>
            {/* <div class="chrome-tab-close"></div> */}
          </div>
        </Tab>
      );

      updatedTabCollection.push(updatedTab);
    });

    setTabList(updatedTabCollection);
    setKey(key + 1);
    // let styleHTML = "";
    // getTabPositions().forEach((position, i) => {
    //   styleHTML += `
    //   .chrome-tabs[data-chrome-tabs-instance-id="${i}"] .chrome-tab:nth-child(${i + 1}) {
    //     transform: translate3d(${position}px, 0, 0)
    //   }
    // `;
    // });

    // console.log(styleHTML);
    // this.styleEl.innerHTML = styleHTML;
  };

  useEffect(() => {
    // setupCustomProperties();
    // setupStyleEl();
    setupEvents();
    layoutTabs();
    return removeEvents;
  }, []);

  return (
    // <RBTabs className="gtas-tabs" activeKey={key} onSelect={k => setKey(k)}>

    <div key={key}>
      <div class="chrome-tabs" style={{ "--tab-content-margin": "9px", height: "140px" }}>
        <div class="chrome-tabs-content" ref={tabsRef}>
          <RBTabs className="" activeKey={key} onSelect={k => setKey(k)}>
            {tabList}
          </RBTabs>

          {/* <nav class="nav nav-tabs" role="tablist">
            {tabList}
          </nav> */}
        </div>
        <div class="chrome-tabs-bottom-bar"></div>
      </div>
      <div class="chrome-tabs-optional-shadow-below-bottom-bar"></div>
    </div>
  );
};

export default ChromeTabs;
