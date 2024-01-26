import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./ticket-dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import urgent from "../../../assets/images/urgent.png";
import weekSignal from "../../../assets/images/week-signal.png";
import goodSignal from "../../../assets/images/good-signal.png";
import signal from "../../../assets/images/signal.png";

import { getQueryParams, sortByPriorityOrTitle } from "../../../utils";
import TicketCard from "../../shared/ticket-card/ticketCard";

import { selectData } from "../../../redux/slices/ticketSlice";
import { useSelector } from "react-redux";

const DEAFULT_PRIORITES = {
  0: "No Priority",
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
};

const prioritySquence = [
  DEAFULT_PRIORITES[0],
  DEAFULT_PRIORITES[4],
  DEAFULT_PRIORITES[3],
  DEAFULT_PRIORITES[2],
  DEAFULT_PRIORITES[1],
];

const PRIORITY_ICONS = {
  [DEAFULT_PRIORITES[0]]: <FontAwesomeIcon icon={faEllipsis} />,
  [DEAFULT_PRIORITES[4]]: (
    <img className="image-icon" src={urgent} alt="urgent.png" />
  ),
  [DEAFULT_PRIORITES[3]]: (
    <img className="image-icon" src={signal} alt="signal.png" />
  ),
  [DEAFULT_PRIORITES[2]]: (
    <img className="image-icon" src={goodSignal} alt="goodSignal.png" />
  ),
  [DEAFULT_PRIORITES[1]]: (
    <img className="image-icon" src={weekSignal} alt="weekSignal.png" />
  ),
};

export default function GroupingByPriority() {
  const ticketData = useSelector(selectData);

  const location = useLocation();

  const formatData = useMemo(
    (data = ticketData) => {
      if (!data?.tickets?.length) return [];
      const priorityMapping = prioritySquence.reduce(
        (prev, curr) => ({ ...prev, [curr]: { priority: curr, tickets: [] } }),
        {}
      );

      for (const ticket of data.tickets) {
        if (!ticket?.status) continue;
        priorityMapping[DEAFULT_PRIORITES[ticket?.priority]]?.tickets?.push(
          ticket
        );
      }

      let finalData = Object.values(priorityMapping);

      if (location.search) {
        const orderByQuery = getQueryParams()?.orderby;
        if (orderByQuery)
          finalData = finalData.map((data) => ({
            ...data,
            tickets: sortByPriorityOrTitle(data?.tickets, orderByQuery),
          }));
      }

      return finalData;
    },
    [location.search, ticketData]
  );

  return (
    <div className="page">
      <div className="container">
        {formatData?.map((priorityData) => {
          return (
            <div className="ticket-container" key={priorityData?.priority}>
              <div className="icons">
                <div>
                  {PRIORITY_ICONS[priorityData?.priority]}
                  <span style={{ marginLeft: 6 }}>
                    {priorityData?.priority || ""}{" "}
                    <span style={{ color: "grey", marginLeft: 6 }}>
                      {priorityData?.tickets?.length || 0}
                    </span>
                  </span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    style={{ marginLeft: 5 }}
                  />
                </div>
              </div>
              {priorityData?.tickets?.map((priorityTicket) => (
                <TicketCard
                  key={priorityTicket?.id}
                  ticket={priorityTicket}
                  imgSrc={"https://picsum.photos/201"}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
