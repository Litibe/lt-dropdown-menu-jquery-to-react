/* eslint-disable array-callback-return */
import React from "react";
import { useEffect, useState } from "react";

import "./css/theme.css";
import "./css/core.css";
import "./css/button.css";
import "./css/selectmenu.css";
import "./css/menu.css";

/**
 * Represents a DropDownSelect menu component (jquery converted).
 * @date 14/11/2023 - 14:45:23
 *
 * @param {string} className: Apply class Css for component
 * @param {string} id required: id to search into DOM result of the select tag.
 * @param {string} title: Title of the select menu.
 * @param {array} dataArray: Array of data to display into the select menu  (ex : [{"name" : "x", "value": "y"},{"name" : "a", "value": "b"} ]).
 * @param {string} keyToWatch: Key to watch into the dataArray to display.
 * @param {string} keyToValue: Key to watch into the dataArray to get the value.
 * @param {string} keyToValueDefaultValue: Key to watch into the dataArray to get the default value.
 * @returns {JSX.Element}
 *
 *  @example
 * <DropDownSelect
 *     className="ui-widget ui-widget-content"
 *    id="select"
 *   title="Select a value"
 *  dataArray={[
 *     { name: "Option 1", value: "1" },
 *    { name: "Option 2", value: "2" },
 *   { name: "Option 3", value: "3" },
 * ]}
 * keyToWatch="name"
 * keyToValue="value"
 * keyToValueDefaultValue="2"
 * />
 */
export default function DropDownSelect(props) {
    // state to manage the selected value by user
    const [selectedName, setSelectedName] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    // state to manage the item over by user
    const [onOverItemId, setOnOverItemIdd] = useState(undefined);
    // state to manage the open menu
    const [openMenu, setOpenMenu] = useState(false);
    // state to generate the default value on load component, depend props element
    useEffect(() => {
        if (props.keyToValueDefaultValue !== undefined) {
            props.dataArray !== undefined &&
                props.dataArray.length >= 1 &&
                props.dataArray.map((element) => {
                    if (
                        element[props.keyToValue] ===
                        props.keyToValueDefaultValue
                    ) {
                        setSelectedName(element[props.keyToWatch]);
                        setSelectedValue(element[props.keyToValue]);
                    }
                });
        }
    }, [props]);

    // select previous or next element with keyboard
    const handleKeyDownSelect = (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const select = document.getElementById(props.id + "-select");
            if (select.children !== undefined) {
                var arrayHTMLUp = Array.from(select.children);
                const result = arrayHTMLUp.filter(
                    (option) => option.value === selectedValue
                );
                if (
                    result[0].previousElementSibling !== null &&
                    result[0].previousElementSibling.innerText !== null
                ) {
                    setSelectedName(result[0].previousElementSibling.innerText);
                    setSelectedValue(result[0].previousElementSibling.value);
                }
            }
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const select = document.getElementById(props.id + "-select");
            if (select.children !== undefined) {
                var arrayHTMLDown = Array.from(select.children);
                const result = arrayHTMLDown.filter(
                    (option) => option.value === selectedValue
                );
                if (
                    result[0].nextElementSibling !== null &&
                    result[0].nextElementSibling.innerText !== null
                ) {
                    setSelectedName(result[0].nextElementSibling.innerText);
                    setSelectedValue(result[0].nextElementSibling.value);
                }
            }
        }
    };
    // return the component with the data array - format JSX
    // A label is added to the select tag to be accessible by screen reader
    // A select tag is added to extract the value of the selected item by user (not visible) but extractable by @param id
    // A span tag is added to display the selected item by user
    // A div tag is added to display the list of items when the user click on the span tag (state openMenu is true)
    // even class CSS are added to manage the display of the component as jquery component
    return (
        <div className={props.className}>
            <label htmlFor={props.id + "-select"}>{props.title}</label>
            <select
                name={props.id}
                id={props.id + "-select"}
                style={{ display: "none" }}
            >
                {props.dataArray !== undefined &&
                    props.dataArray.length >= 1 &&
                    props.dataArray.map((element) => (
                        <option
                            key={"option" + element[props.keyToValue]}
                            value={element[props.keyToValue]}
                        >
                            {element[props.keyToWatch]}
                        </option>
                    ))}
            </select>
            <span
                tabIndex="0"
                aria-expanded={openMenu ? "true" : "false"}
                aria-autocomplete="list"
                aria-haspopup="true"
                className={
                    openMenu
                        ? "ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-open ui-corner-top"
                        : "ui-selectmenu-button ui-selectmenu-button-closed ui-corner-all ui-button ui-widget"
                }
                onClick={() => setOpenMenu(!openMenu)}
                onKeyDown={(e) => handleKeyDownSelect(e)}
            >
                <span className="ui-selectmenu-icon ui-icon ui-icon-triangle-1-s"></span>
                <span
                    className="ui-selectmenu-text"
                    value={selectedValue}
                    id={props.id}
                >
                    {selectedName}
                </span>
            </span>
            <div
                className={
                    openMenu
                        ? "ui-selectmenu-menu ui-front ui-selectmenu-open"
                        : "ui-selectmenu-menu ui-front"
                }
            >
                <ul
                    aria-hidden={!openMenu}
                    aria-labelledby={props.id + "-menu"}
                    id={props.id + "-menu"}
                    role="listbox"
                    tabIndex="0"
                    className="ui-menu ui-widget ui-widget-content"
                >
                    {props.dataArray !== undefined &&
                        props.dataArray.length >= 1 &&
                        props.dataArray.map((element) => (
                            <li
                                className="ui-menu-item"
                                key={element[props.keyToValue]}
                                onClick={() => {
                                    setSelectedName(element[props.keyToWatch]);
                                    setSelectedValue(element[props.keyToValue]);
                                    setOpenMenu(!openMenu);
                                }}
                                onMouseOver={() => {
                                    setOnOverItemIdd(element[props.keyToValue]);
                                }}
                            >
                                <div
                                    role="menuitem"
                                    className={
                                        element[props.keyToValue] ===
                                        onOverItemId
                                            ? "ui-menu-item-wrapper ui-state-active"
                                            : "ui-menu-item-wrapper "
                                    }
                                >
                                    {element[props.keyToWatch]}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
