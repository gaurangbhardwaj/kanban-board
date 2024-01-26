import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./ticket-dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPlus,
  faCircle,
  faCircleXmark,
  faCircleCheck,
  faCircleHalfStroke,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { getQueryParams, sortByPriorityOrTitle } from "../../../utils";
import TicketCard from "../../shared/ticket-card/ticketCard";

import { selectData } from "../../../redux/slices/ticketSlice";
import { useSelector } from "react-redux";

const DEAFULT_STATUSES = {
  BACKLOG: "Backlog",
  TODO: "Todo",
  IN_PROGRESS: "In progress",
  DONE: "Done",
  CANCELED: "Canceled",
};

const STATUS_ICONS = {
  [DEAFULT_STATUSES.BACKLOG]: (
    <FontAwesomeIcon icon={faExclamation} color="red" />
  ),
  [DEAFULT_STATUSES.TODO]: <FontAwesomeIcon icon={faCircle} color="grey" />,
  [DEAFULT_STATUSES.IN_PROGRESS]: (
    <FontAwesomeIcon icon={faCircleHalfStroke} color="yellow" />
  ),
  [DEAFULT_STATUSES.DONE]: (
    <FontAwesomeIcon icon={faCircleCheck} color="blue" />
  ),
  [DEAFULT_STATUSES.CANCELED]: (
    <FontAwesomeIcon icon={faCircleXmark} color="grey" />
  ),
};

export default function GroupingByStatus() {
  const ticketData = useSelector(selectData);

  const location = useLocation();

  const formatData = useMemo(
    (data = ticketData) => {
      if (!data?.tickets?.length) return [];
      const statusesMapping = Object.values(DEAFULT_STATUSES).reduce(
        (prev, curr) => ({ ...prev, [curr]: { status: curr, tickets: [] } }),
        {}
      );

      for (const ticket of data.tickets) {
        if (!ticket?.status) continue;
        statusesMapping[ticket?.status]?.tickets?.push(ticket);
      }

      let finalData = Object.values(statusesMapping);

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
        {formatData?.map((statusData) => {
          return (
            <div className="ticket-container" key={statusData?.user?.id}>
              <div className="icons">
                <div>
                  {STATUS_ICONS[statusData?.status]}
                  <span style={{ marginLeft: 6 }}>
                    {statusData?.status || ""}{" "}
                    <span style={{ color: "grey", marginLeft: 6 }}>
                      {statusData?.tickets?.length || 0}
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
              {statusData?.tickets?.map((statusTicket) => (
                <TicketCard
                  key={statusTicket?.id}
                  ticket={statusTicket}
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
