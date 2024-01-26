import React, { useEffect, useRef } from "react";
import "./navBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getQueryParams } from "../../../utils";
import { useDispatch } from "react-redux";
import { getTicketData } from "../../../redux/slices/ticketSlice";

export default function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOptionForGrouping, setSelectedOptionForGrouping] = useState(
    window?.location?.pathname?.slice(1) || "users"
  );
  const [selectedOptionForOrdering, setSelectedOptionForOrdering] = useState(
    getQueryParams()["orderby"] || ""
  );

  const optionsForGrouping = [
    { label: "Status", value: "status" },
    { label: "User", value: "users" },
    { label: "Priority", value: "priority" },
  ];
  const optionsForOrdering = [
    { label: "Priority", value: "priority" },
    { label: "Title", value: "title" },
  ];

  const handleChangeForGrouping = (event) => {
    setSelectedOptionForGrouping(event.target.value);
    navigate(`/${event.target.value}`);
  };
  const handleChangeForOrdering = (event) => {
    setSelectedOptionForOrdering(event.target.value);
    if (event.target.value === "none")
      return navigate(`/${selectedOptionForGrouping}`);
    navigate(`/${selectedOptionForGrouping}?orderby=${event.target.value}`);
  };
  const popRef = useRef(null);
  const openlist = () => {
    setIsOpened(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpened && !popRef.current.contains(event.target)) {
        setIsOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpened]);

  useEffect(() => {
    dispatch(getTicketData());
  }, [dispatch]);

  return (
    <nav>
      <button className="display-btn" onClick={openlist}>
        <FontAwesomeIcon icon={faSlidersH} style={{ fontSize: "1vw" }} />{" "}
        <span style={{ fontSize: "1vw" }}>Display</span>{" "}
        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: "1vw" }} />
      </button>
      <div
        className="list-box"
        ref={popRef}
        style={{ display: isOpened ? "" : "none" }}
      >
        <div>
          <span>Grouping</span>
          <select
            value={selectedOptionForGrouping}
            onChange={handleChangeForGrouping}
          >
            {optionsForGrouping.map((option) => (
              <option key={option.value} value={option.value}>
                {" "}
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>Ordering</span>
          <select
            value={selectedOptionForOrdering}
            onChange={handleChangeForOrdering}
          >
            <option defaultValue value={"none"}>
              None
            </option>
            {optionsForOrdering.map((option) => (
              <option key={option.value} value={option.value}>
                {" "}
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}
