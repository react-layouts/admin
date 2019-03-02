import _objectWithoutProperties from "/c/users/johnr/Development/github/layouts/admin/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "react";
import useMedia from "../hooks/useMedia";
import "./AdminLayout.css";

function AdminLayout(props) {
  var id = props.id,
      header = props.header,
      sidebar = props.sidebar,
      nav = props.nav,
      footer = props.footer,
      children = props.children,
      _props$headerHeight = props.headerHeight,
      headerHeight = _props$headerHeight === void 0 ? "90px" : _props$headerHeight,
      _props$mobileHeaderHe = props.mobileHeaderHeight,
      mobileHeaderHeight = _props$mobileHeaderHe === void 0 ? "90px" : _props$mobileHeaderHe,
      _props$sidebarWidth = props.sidebarWidth,
      sidebarWidth = _props$sidebarWidth === void 0 ? "250px" : _props$sidebarWidth,
      _props$mobileSidebarW = props.mobileSidebarWidth,
      mobileSidebarWidth = _props$mobileSidebarW === void 0 ? "250px" : _props$mobileSidebarW,
      _props$breakpoint = props.breakpoint,
      breakpoint = _props$breakpoint === void 0 ? "768px" : _props$breakpoint,
      other = _objectWithoutProperties(props, ["id", "header", "sidebar", "nav", "footer", "children", "headerHeight", "mobileHeaderHeight", "sidebarWidth", "mobileSidebarWidth", "breakpoint"]);

  var isMobile = useMedia(["(min-width: ".concat(breakpoint, ")")], [false], true);
  var dimensions = {
    sidebarWidth: typeof sidebarWidth === 'function' ? sidebarWidth(isMobile) : sidebarWidth,
    mobileSidebarWidth: typeof mobileSidebarWidth === 'function' ? mobileSidebarWidth(isMobile) : mobileSidebarWidth,
    headerHeight: typeof headerHeight === 'function' ? headerHeight(isMobile) : headerHeight,
    mobileHeaderHeight: typeof mobileHeaderHeight === 'function' ? mobileHeaderHeight(isMobile) : mobileHeaderHeight
  };

  var rules = function rules(styles, mobileStyles) {
    if (!isMobile) {
      return styles;
    }

    return Object.assign({}, styles, mobileStyles);
  };

  var wrapStyles = rules({
    minHeight: "100vh",
    display: "flex",
    flexFlow: "row wrap"
  }, {
    paddingTop: "".concat(dimensions.headerHeight)
  });
  var bodyStyles = rules({
    width: "calc(100% - ".concat(dimensions.sidebarWidth, ")"),
    minHeight: "calc(100vh - ".concat(dimensions.headerHeight, ")"),
    display: "flex",
    flexFlow: "column wrap",
    order: 3
  }, {
    width: "100%",
    position: "relative",
    zIndex: 1,
    flex: "none"
  });
  var mainStyles = {
    flex: 1,
    width: '100%'
  };
  var asideStyles = rules({
    width: "".concat(dimensions.sidebarWidth),
    minHeight: "calc(100vh - ".concat(dimensions.headerHeight, ")"),
    order: 2
  }, {
    width: "".concat(dimensions.mobileSidebarWidth),
    position: "fixed",
    top: "".concat(dimensions.mobileHeaderHeight),
    left: "0",
    bottom: "0",
    zIndex: 1,
    flex: "none"
  });
  var toggleStyles = rules({
    cursor: "pointer",
    display: "none"
  }, {
    display: "inline-block"
  });
  var headerStyles = rules({
    height: "".concat(dimensions.headerHeight),
    flex: "1 100%",
    order: 1
  }, {
    width: "100%",
    height: "".concat(dimensions.mobileHeaderHeight),
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "1",
    flex: "none"
  });
  return React.createElement("div", {
    id: id,
    className: "admin-layout".concat(isMobile ? " admin-layout--mobile" : "")
  }, React.createElement("input", {
    type: "checkbox",
    id: "toggle-sidebar",
    style: {
      display: "none"
    },
    value: 1
  }), React.createElement("section", {
    className: "admin-layout__wrap",
    style: wrapStyles
  }, React.createElement("section", {
    className: "admin-layout__body",
    style: bodyStyles
  }, React.createElement("nav", {
    className: "admin-layout__nav"
  }, React.isValidElement(nav) && React.cloneElement(nav, Object.assign({}, other))), React.createElement("main", {
    className: "admin-layout__content",
    style: mainStyles
  }, React.isValidElement(children) && React.cloneElement(children, Object.assign({}, other))), React.createElement("footer", {
    className: "admin-layout__footer"
  }, React.isValidElement(footer) && React.cloneElement(footer, Object.assign({}, other)))), React.createElement("aside", {
    className: "admin-layout__sidebar",
    style: asideStyles
  }, React.isValidElement(sidebar) && React.cloneElement(sidebar, Object.assign({}, other))), React.createElement("header", {
    className: "admin-layout__header",
    style: headerStyles
  }, React.createElement("div", null, React.createElement("label", {
    htmlFor: "toggle-sidebar",
    style: toggleStyles
  }, "\u2630"), React.isValidElement(header) && React.cloneElement(header, Object.assign({}, other))))));
}

export default AdminLayout;