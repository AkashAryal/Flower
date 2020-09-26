import React, { ReactElement, useState } from 'react';

import styles from './StudyCard.module.css';
import StudyCardInlineEditor from './StudyCardInlineEditor';
import StudyCardInlineSchedular from './StudyCardInlineSchedular';

type Props = {
  readonly className?: string;
  readonly type: 'editable' | 'schedulable';
  readonly study: AppStudyWithoutID;
};

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1501619951397-5ba40d0f75da?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80';

const StudyCard = ({
  className,
  type,
  study: { projectName, rewards, description, avaliableTimes, duration, eligibility },
}: Props): ReactElement => {
  const [showEdit, setShowEdit] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div
      className={className ? `card ${styles.StudyCard} ${className}` : `card ${styles.StudyCard}`}
    >
      <div className="card__image">
        <img src={PLACEHOLDER_IMAGE} alt="Random Study" />
      </div>
      <p style={{ fontWeight: 'bolder' }}></p>
      <div className="card__body">
        <h3>{projectName}</h3>
        <p>Rewards: {rewards}</p>
        <p>Description: {description}</p>
        <p>Avaliable Times: {avaliableTimes.join(', ')}</p>
        <p>Duration: {duration}</p>
        <p>Eligibility: {eligibility}</p>
      </div>
      {showEdit && <StudyCardInlineEditor />}
      {showSchedule && <StudyCardInlineSchedular />}
      <div className="card__footer">
        {type === 'editable' && !showEdit && (
          <button
            className="button button--primary button--block"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </button>
        )}
        {type === 'schedulable' && !showSchedule && (
          <button
            className="button button--primary button--block"
            onClick={() => setShowSchedule(true)}
          >
            Schedule
          </button>
        )}
      </div>
    </div>
  );
};

export default StudyCard;
