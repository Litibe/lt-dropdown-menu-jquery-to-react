/* eslint-disable array-callback-return */
import React from "react";
import { useEffect, useState } from "react";

import "./css/theme.css";
import "./css/core.css";
import "./css/button.css";
import "./css/selectmenu.css";
import "./css/menu.css";

export default function DropDownSelect(props) {
    const [selectedName, setSelectedName] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [onOverItemId, setOnOverItemIdd] = useState(undefined);
    const [openMenu, setOpenMenu] = useState(false);
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
        e.preventDefault();
        if (e.key === "ArrowUp") {
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
