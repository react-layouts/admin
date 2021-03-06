import React from "react";
import useMedia from "../hooks/useMedia";

import "./AdminLayout.css";

function AdminLayout(props) {
  const {
    id,
    logo,
    header,
    sidebar,
    nav,
    footer,
    children,
    headerHeight = "90px",
    mobileHeaderHeight = "90px",
    sidebarWidth = "250px",
    mobileSidebarWidth = "250px",
    breakpoint = "768px",
    ...other
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
      display: "inline-block",
      marginRight: '10px'
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

  let headerDivStyles = rules({
    display: 'flex',
    alignItems: 'center'
  }, {

  });

  let logoStyles = rules({
    display: 'flex',
    alignItems: 'center',
    width: `${sidebarWidth}`,
    height: `${dimensions.headerHeight}`
  }, {
    width: 'auto',
    padding: '0 10px',
    border: 'none'
  })

  return (
    <div id={id} className={`admin-layout${isMobile ? " admin-layout--mobile" : ""}`}>
      <input
        type="checkbox"
        id="toggle-sidebar"
        style={{ display: "none" }}
        value={1}
      />
      <section className="admin-layout__wrap" style={wrapStyles}>
        <section className="admin-layout__body" style={bodyStyles}>
          <nav className="admin-layout__nav">{React.isValidElement(nav) && React.cloneElement(nav, {...other})}</nav>
          <main className="admin-layout__content" style={mainStyles}>
            {React.isValidElement(children) && React.cloneElement(children, {...other})}
          </main>
          <footer className="admin-layout__footer">{React.isValidElement(footer) && React.cloneElement(footer, {...other})}</footer>
        </section>
        <aside className="admin-layout__sidebar" style={asideStyles}>
          {React.isValidElement(sidebar) && React.cloneElement(sidebar, {...other})}
        </aside>
        <header className="admin-layout__header" style={headerStyles}>
          <div style={headerDivStyles}>            
            <div className="admin-layout__header--logo" style={logoStyles}>
              <label htmlFor="toggle-sidebar" style={toggleStyles}>
                ☰
              </label>
              {React.isValidElement(logo) && React.cloneElement(logo, {...other})}
            </div>
            <div className="admin-layout__header--nav">
              {React.isValidElement(header) && React.cloneElement(header, {...other})}
            </div>
          </div>
        </header>
      </section>
    </div>
  );
}

export default AdminLayout;
