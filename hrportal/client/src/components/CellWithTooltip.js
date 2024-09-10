import React, { useState } from "react";
import styles from "./CellWithTooltip.module.css"; // Make sure this CSS module exists

const getTooltipContent = (column, value, names) => {
  console.log(names);
  if (value === 0) return null;

  const contentMap = {
    noOfCandidatesApproached: `${names} candidates were approached for this position.`,
    candidatesNotInterested: `${names} candidates were not interested or did not respond.`,
    firstRoundScheduled: `${names} candidates were scheduled for the first round.`,
    rejectedRound1: `${names} candidates were rejected after the first round.`,
    onHoldRound1: `${names} candidates were put on hold after the first round.`,
    clearedRound1: `${names} candidates cleared the first round.`,
    secondRoundScheduled: `${names} candidates were scheduled for the second round.`,
    rejectedRound2: `${names} candidates were rejected after the second round.`,
    onHoldRound2: `${names} candidates were put on hold after the second round.`,
    clearedRound2: `${names} candidates cleared the second round.`,
    negotiationStage: `${names} candidates are in the negotiation stage.`,
    offerWithdrawn: `Offers were withdrawn for ${names} candidates.`,
    offerAccepted: `${names} candidates accepted the offer.`,
    candidateBackedOut: `${names} candidates backed out after initially showing interest.`,
  };

    return contentMap[column] || `Value: ${value}`;

};

const CellWithTooltip = ({ column, value, names }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipContent = getTooltipContent(column, names);
  console.log('Column:', column, 'Value:', value, 'Names:', names);

  if (!tooltipContent) {
    return <td>{value}</td>;
  }


  return (
    <td
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {value}
      {isTooltipVisible && (
        <span className={styles.tooltip}>{tooltipContent}</span>
      )}
    </td>
  );
};

export default CellWithTooltip;