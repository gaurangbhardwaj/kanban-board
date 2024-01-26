import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./ticket-dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getQueryParams, sortByPriorityOrTitle } from "../../../utils";
import TicketCard from "../../shared/ticket-card/ticketCard";

import { selectData } from "../../../redux/slices/ticketSlice";
import { useSelector } from "react-redux";

export default function GroupingByUser() {
  const ticketData = useSelector(selectData);

  const location = useLocation();

  const formatData = useMemo(
    (data = ticketData) => {
      if (!data?.users?.length || !data?.tickets?.length) return [];
      const userMapping = data.users.reduce(
        (prev, curr) => ({ ...prev, [curr.id]: { user: curr, tickets: [] } }),
        {}
      );
      for (const ticket of data.tickets) {
        if (!ticket?.userId || !userMapping[ticket?.userId]) continue;
        userMapping[ticket?.userId]?.tickets?.push(ticket);
      }

      let finalData = Object.values(userMapping);

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
        {formatData?.map((userData) => {
          return (
            <div className="ticket-container" key={userData?.user?.id}>
              <div className="icons">
                <span style={{ marginLeft: 6 }}>
                  <img
                    className="profile-img"
                    src="https://picsum.photos/201"
                    alt={userData?.user?.name}
                  />
                  {userData?.user?.name || ""}{" "}
                  <span style={{ color: "grey", marginLeft: 6 }}>
                    {userData?.tickets?.length || 0}
                  </span>
                </span>
                <div>
                  <FontAwesomeIcon icon={faPlus} />
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    style={{ marginLeft: 5 }}
                  />
                </div>
              </div>
              {userData?.tickets?.map((userTicket) => (
                <TicketCard key={userTicket?.id} ticket={userTicket} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
