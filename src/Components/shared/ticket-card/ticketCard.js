import { memo } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ticketCard.css";

const TicketCard = ({ ticket, imgSrc }) => {
  return (
    <div className="card" key={ticket?.id}>
      <span className="ids">
        {ticket?.id || ""}
        {imgSrc && <img src={imgSrc} alt={imgSrc} />}
      </span>
      <span className="titles">
        {" "}
        <input type="checkbox" />
        {ticket?.title || ""}
      </span>
      <span
        style={{
          color: "grey",
          marginTop: "0.5vw",
          fontSize: "0.8vw",
        }}
      >
        <FontAwesomeIcon icon={faCircle} size="xs" color="#D0D3D4" />{" "}
        {ticket?.tag || ""}
      </span>
    </div>
  );
};

export default memo(TicketCard);
