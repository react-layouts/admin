import React from "react";
import useMedia from "../hooks/useMedia";

import "./AdminLayout.css";

function AdminLayout(props) {
  const {
    header,
    sidebar,
    nav,
    footer,
    children,
    headerHeight = "90px",
    mobileHeaderHeight = "90px",
    sidebarWidth = "250px",
    mobileSidebarWidth = "250px",
    breakpoint = "768px"
  } = props;

  const isMobile = useMedia([`(min-width: ${breakpoint})`], [false], true);

  let dimensions = {
      sidebarWidth: typeof sidebarWidth === 'function' ? sidebarWidth(isMobile) : sidebarWidth,
      mobileSidebarWidth: typeof mobileSidebarWidth === 'function' ? mobileSidebarWidth(isMobile) : mobileSidebarWidth,
      headerHeight: typeof headerHeight === 'function' ? headerHeight(isMobile) : headerHeight,
      mobileHeaderHeight: typeof mobileHeaderHeight === 'function' ? mobileHeaderHeight(isMobile) : mobileHeaderHeight,
  }
  
  const rules = (styles, mobileStyles) => {
    if (!isMobile) {
      return styles;
    }
    return {
      ...styles,
      ...mobileStyles
    };
  };

  const wrapStyles = rules(
    {
      minHeight: "100vh",
      display: "flex",
      flexFlow: "row wrap"
    },
    {
      paddingTop: `${dimensions.headerHeight}`
    }
  );

  const bodyStyles = rules(
    {
      width: `calc(100% - ${dimensions.sidebarWidth})`,
      minHeight: `calc(100vh - ${dimensions.headerHeight})`,
      display: "flex",
      flexFlow: "column wrap",
      order: 3
    },
    {
      width: "100%",
      position: "relative",
      zIndex: 1,
      flex: "none"
    }
  );

  const mainStyles = {
    flex: 1,
    width: '100%'
  };

  let asideStyles = rules(
    {
      width: `${dimensions.sidebarWidth}`,
      minHeight: `calc(100vh - ${dimensions.headerHeight})`,
      order: 2
    },
    {
      width: `${dimensions.mobileSidebarWidth}`,
      position: "fixed",
      top: `${dimensions.mobileHeaderHeight}`,
      left: "0",
      bottom: "0",
      zIndex: 1,
      flex: "none"
    }
  );

  let toggleStyles = rules(
    {
      cursor: "pointer",
      display: "none"
    },
    {
      display: "inline-block"
    }
  );

  let headerStyles = rules(
    {
      height: `${dimensions.headerHeight}`,
      flex: "1 100%",
      order: 1
    },
    {
      width: "100%",
      height: `${dimensions.mobileHeaderHeight}`,
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "1",
      flex: "none"
    }
  );

  return (
    <div className={`admin-layout${isMobile ? " admin-layout--mobile" : ""}`}>
      <input
        type="checkbox"
        id="toggle-sidebar"
        style={{ display: "none" }}
        value={1}
      />
      <section className="admin-layout__wrap" style={wrapStyles}>
        <section className="admin-layout__body" style={bodyStyles}>
          <nav className="admin-layout__nav">{nav}</nav>
          <main className="admin-layout__content" style={mainStyles}>
            {children}
          </main>
          <footer className="admin-layout__footer">{footer}</footer>
        </section>
        <aside className="admin-layout__sidebar" style={asideStyles}>
          {sidebar}
        </aside>
        <header className="admin-layout__header" style={headerStyles}>
          <div>
            <label htmlFor="toggle-sidebar" style={toggleStyles}>
              ☰
            </label>
            {header}
          </div>
        </header>
      </section>
    </div>
  );
}

export default AdminLayout;
