"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DropDownSelect;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = require("react");
require("./css/theme.css");
require("./css/core.css");
require("./css/button.css");
require("./css/selectmenu.css");
require("./css/menu.css");
/* eslint-disable array-callback-return */

function DropDownSelect(props) {
  const [selectedName, setSelectedName] = (0, _react.useState)("");
  const [selectedValue, setSelectedValue] = (0, _react.useState)("");
  const [onOverItemId, setOnOverItemIdd] = (0, _react.useState)(undefined);
  const [openMenu, setOpenMenu] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (props.keyToValueDefaultValue !== undefined) {
      props.dataArray !== undefined && props.dataArray.length >= 1 && props.dataArray.map(element => {
        if (element[props.keyToValue] === props.keyToValueDefaultValue) {
          setSelectedName(element[props.keyToWatch]);
          setSelectedValue(element[props.keyToValue]);
        }
      });
    }
  }, [props]);

  // select previous or next element with keyboard
  const handleKeyDownSelect = e => {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      const select = document.getElementById(props.id + "-select");
      if (select.children !== undefined) {
        var arrayHTMLUp = Array.from(select.children);
        const result = arrayHTMLUp.filter(option => option.value === selectedValue);
        if (result[0].previousElementSibling !== null && result[0].previousElementSibling.innerText !== null) {
          setSelectedName(result[0].previousElementSibling.innerText);
          setSelectedValue(result[0].previousElementSibling.value);
        }
      }
    }
    if (e.key === "ArrowDown") {
      const select = document.getElementById(props.id + "-select");
      if (select.children !== undefined) {
        var arrayHTMLDown = Array.from(select.children);
        const result = arrayHTMLDown.filter(option => option.value === selectedValue);
        if (result[0].nextElementSibling !== null && result[0].nextElementSibling.innerText !== null) {
          setSelectedName(result[0].nextElementSibling.innerText);
          setSelectedValue(result[0].nextElementSibling.value);
        }
      }
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: props.className
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.id + "-select"
  }, props.title), /*#__PURE__*/React.createElement("select", {
    name: props.id,
    id: props.id + "-select",
    style: {
      display: "none"
    }
  }, props.dataArray !== undefined && props.dataArray.length >= 1 && props.dataArray.map(element => /*#__PURE__*/React.createElement("option", {
    key: "option" + element[props.keyToValue],
    value: element[props.keyToValue]
  }, element[props.keyToWatch]))), /*#__PURE__*/React.createElement("span", {
    tabIndex: "0",
    "aria-expanded": openMenu ? "true" : "false",
    "aria-autocomplete": "list",
    "aria-haspopup": "true",
    className: openMenu ? "ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-open ui-corner-top" : "ui-selectmenu-button ui-selectmenu-button-closed ui-corner-all ui-button ui-widget",
    onClick: () => setOpenMenu(!openMenu),
    onKeyDown: e => handleKeyDownSelect(e)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-selectmenu-icon ui-icon ui-icon-triangle-1-s"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ui-selectmenu-text",
    value: selectedValue,
    id: props.id
  }, selectedName)), /*#__PURE__*/React.createElement("div", {
    className: openMenu ? "ui-selectmenu-menu ui-front ui-selectmenu-open" : "ui-selectmenu-menu ui-front"
  }, /*#__PURE__*/React.createElement("ul", {
    "aria-hidden": !openMenu,
    "aria-labelledby": props.id + "-menu",
    id: props.id + "-menu",
    role: "listbox",
    tabIndex: "0",
    className: "ui-menu ui-widget ui-widget-content"
  }, props.dataArray !== undefined && props.dataArray.length >= 1 && props.dataArray.map(element => /*#__PURE__*/React.createElement("li", {
    className: "ui-menu-item",
    key: element[props.keyToValue],
    onClick: () => {
      setSelectedName(element[props.keyToWatch]);
      setSelectedValue(element[props.keyToValue]);
      setOpenMenu(!openMenu);
    },
    onMouseOver: () => {
      setOnOverItemIdd(element[props.keyToValue]);
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "menuitem",
    className: element[props.keyToValue] === onOverItemId ? "ui-menu-item-wrapper ui-state-active" : "ui-menu-item-wrapper "
  }, element[props.keyToWatch]))))));
}