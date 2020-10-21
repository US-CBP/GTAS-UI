import React, { useState, useEffect, useRef } from "react";
import { Tabs as RBTabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import "./ChromeTabs.css";

const ChromeTabs = props => {
  const [key, setKey] = useState();
  const tabsRef = useRef(null);
  let instanceId = 1;
  const tablist = props.tabs.map(tab => {
    return (
      // <Tab eventKey={tab.titleText} key={tab.titleText} {...tab}>
      //   {tab.link}
      // </Tab>
      <div
        class="chrome-tab"
        eventKey={tab.titleText}
        key={tab.titleText}
        data-chrome-tabs-instance-id={instanceId++}
      >
        <div class="chrome-tab-dividers"></div>
        <div class="chrome-tab-background"></div>
        <div class="chrome-tab-content">
          <div class="chrome-tab-favicon"></div>
          <div class="chrome-tab-title">{tab.titleText}</div>
          <div class="chrome-tab-drag-handle"></div>
          <div class="chrome-tab-close"></div>
        </div>
      </div>
    );
  });

  const TAB_CONTENT_MARGIN = 9;
  const TAB_CONTENT_OVERLAP_DISTANCE = 1;

  const TAB_OVERLAP_DISTANCE = TAB_CONTENT_MARGIN * 2 + TAB_CONTENT_OVERLAP_DISTANCE;

  const TAB_CONTENT_MIN_WIDTH = 24;
  const TAB_CONTENT_MAX_WIDTH = 240;

  const TAB_SIZE_SMALL = 84;
  const TAB_SIZE_SMALLER = 60;
  const TAB_SIZE_MINI = 48;

  const noop = _ => {};

  const closest = (value, array) => {
    let closest = Infinity;
    let closestIndex = -1;

    array.forEach((v, i) => {
      if (Math.abs(value - v) < closest) {
        closest = Math.abs(value - v);
        closestIndex = i;
      }
    });

    return closestIndex;
  };

  const tabTemplate = (
    <div class="chrome-tab">
      <div class="chrome-tab-dividers"></div>
      <div class="chrome-tab-background"></div>
      <div class="chrome-tab-content">
        <div class="chrome-tab-favicon"></div>
        <div class="chrome-tab-title"></div>
        <div class="chrome-tab-drag-handle"></div>
        <div class="chrome-tab-close"></div>
      </div>
    </div>
  );

  const defaultTapProperties = {
    title: "New tab",
    favicon: false
  };

  //init
  // this.instanceId = instanceId;
  // this.el.setAttribute("data-chrome-tabs-instance-id", this.instanceId);
  // instanceId += 1;

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

  const updateTab = (tabEl, tabProperties) => {
    // tabEl.querySelector(".chrome-tab-title").textContent = tabProperties.title;
    // const faviconEl = tabEl.querySelector(".chrome-tab-favicon");
    // if (tabProperties.favicon) {
    //   faviconEl.style.backgroundImage = `url('${tabProperties.favicon}')`;
    //   faviconEl.removeAttribute("hidden", "");
    // } else {
    //   faviconEl.setAttribute("hidden", "");
    //   faviconEl.removeAttribute("style");
    // }
    // if (tabProperties.id) {
    //   tabEl.setAttribute("data-tab-id", tabProperties.id);
    // }
  };

  const emit = (eventName, data) => {
    this.el.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  };

  const setupCustomProperties = () => {
    // this.el.style.setProperty("--tab-content-margin", `${TAB_CONTENT_MARGIN}px`);
  };

  const setupStyleEl = () => {
    // this.styleEl = document.createElement("style");
    // this.el.appendChild(this.styleEl);
  };

  const removeEvents = () => {
    window.removeEventListener("resize", layoutTabs);
  };

  const setupEvents = () => {
    window.addEventListener("resize", layoutTabs);
    // this.el.addEventListener("dblclick", event => {
    //   if ([this.el, this.tabContentEl].includes(event.target)) this.addTab();
    // });
    // this.tabEls.forEach(tabEl => this.setTabCloseEventListener(tabEl));
  };

  const getTabEls = () => {
    return tablist;
    // return Array.prototype.slice.call(this.el.querySelectorAll(".chrome-tab"));
  };

  const getTabContentEl = () => {
    // return this.el.querySelector(".chrome-tabs-content");
    // console.log(tabsRef.current);
    return tabsRef.current;
  };

  const getTabContentWidths = () => {
    const numberOfTabs = getTabEls().length;
    const tabsContentWidth = getTabContentEl().clientWidth;
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
    return widths;
  };

  const getTabContentPositions = () => {
    const positions = [];
    const tabContentWidths = getTabContentWidths();
    let position = TAB_CONTENT_MARGIN;
    tabContentWidths.forEach((width, i) => {
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

  const layoutTabs = () => {
    // console.log("layout!");
    const tabContentWidths = getTabContentWidths();
    getTabEls().forEach((tabEl, i) => {
      // console.log(tabEl);
      const contentWidth = tabContentWidths[i];
      const width = contentWidth + 2 * TAB_CONTENT_MARGIN;

      const elStyle = { width: width + "px" };

      // tabEl.style = elStyle;
      // tabEl.removeAttribute("is-small");
      // tabEl.removeAttribute("is-smaller");
      // tabEl.removeAttribute("is-mini");
      // if (contentWidth < TAB_SIZE_SMALL) tabEl.setAttribute("is-small", "");
      // if (contentWidth < TAB_SIZE_SMALLER) tabEl.setAttribute("is-smaller", "");
      // if (contentWidth < TAB_SIZE_MINI) tabEl.setAttribute("is-mini", "");
    });
    let styleHTML = "";
    getTabPositions().forEach((position, i) => {
      styleHTML += `
      .chrome-tabs[data-chrome-tabs-instance-id="${i}"] .chrome-tab:nth-child(${i + 1}) {
        transform: translate3d(${position}px, 0, 0)
      }
    `;
    });

    console.log(styleHTML);
    // this.styleEl.innerHTML = styleHTML;
  };

  // createNewTabEl() {
  //   const div = document.createElement('div')
  //   div.innerHTML = tabTemplate
  //   return div.firstElementChild
  // }

  useEffect(() => {
    setupCustomProperties();
    setupStyleEl();
    setupEvents();
    layoutTabs();
    return removeEvents;
  });

  return (
    // <div class="surface">
    //   <div class="mock-browser">
    //     <div class="chrome-tabs" style="--tab-content-margin: 9px">
    //       <div class="chrome-tabs-content">
    //         <div class="chrome-tab">
    //           <div class="chrome-tab-dividers"></div>
    //           <div class="chrome-tab-background"></div>
    //           <div class="chrome-tab-content">
    //             <div class="chrome-tab-favicon" style=""></div>
    //             <div class="chrome-tab-title">Google</div>
    //             <div class="chrome-tab-drag-handle"></div>
    //             <div class="chrome-tab-close"></div>
    //           </div>
    //         </div>
    //         <div class="chrome-tab" active>
    //           <div class="chrome-tab-dividers"></div>
    //           <div class="chrome-tab-background"></div>
    //           <div class="chrome-tab-content">
    //             <div class="chrome-tab-favicon"></div>
    //             <div class="chrome-tab-title">Facebook</div>
    //             <div class="chrome-tab-drag-handle"></div>
    //             <div class="chrome-tab-close"></div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="chrome-tabs-bottom-bar"></div>
    //     </div>
    //     <div class="chrome-tabs-optional-shadow-below-bottom-bar"></div>
    //   </div>
    // </div>

    // <RBTabs className="gtas-tabs" activeKey={key} onSelect={k => setKey(k)}>

    <div class="surface">
      <div class="mock-browser">
        <div class="chrome-tabs" style={{ "--tab-content-margin": "9px" }}>
          <div class="chrome-tabs-content" ref={tabsRef}>
            {tablist}
          </div>
          <div class="chrome-tabs-bottom-bar"></div>
        </div>
        <div class="chrome-tabs-optional-shadow-below-bottom-bar"></div>
      </div>
    </div>
  );
};

export default ChromeTabs;
