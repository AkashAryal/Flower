import React, { ReactElement } from 'react';

import styles from './Study.module.css';

type Props = {
  readonly className?: string;
  readonly study: AppStudyWithoutID;
};

const Study = ({
  className,
  study: { projectName, rewards, description, avaliableTimes, duration, eligibility },
}: Props): ReactElement => {
  return (
    <div
      className={className ? `card ${styles.StudyCard} ${className}` : `card ${styles.StudyCard}`}
    >
      <div className="card__image">
        <img
          src="https://images.unsplash.com/photo-1506624183912-c602f4a21ca7?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=400&amp;q=60"
          alt="Random Study"
        />
      </div>
      <p style={{ fontWeight: 'bolder' }}></p>
      <div className="card__body">
        <h4>{projectName}</h4>
        <p>Rewards: {rewards}</p>
        <p>Description: {description}</p>
        <p>Description: {avaliableTimes.join(', ')}</p>
        <p>Duration: {duration}</p>
        <p>Eligibility: {eligibility}</p>
      </div>
    </div>
  );
};

export default Study;
