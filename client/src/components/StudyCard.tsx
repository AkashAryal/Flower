import React, { ReactElement, useState } from 'react';

import firebase from '../fbConfig';
import { useMySchedulesFromFirestore } from '../hooks/user-data';
import styles from './StudyCard.module.css';
import StudyCardInlineEditor from './StudyCardInlineEditor';
import StudyCardInlineSchedular from './StudyCardInlineSchedular';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1501619951397-5ba40d0f75da?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80';

const StudyCardContent = ({
  study: { projectName, rewards, description, availableTimes, duration, eligibility },
}: {
  readonly study: AppStudy;
}): ReactElement => (
  <div className="card__body">
    <h3>{projectName}</h3>
    <p>Rewards: {rewards}</p>
    <p>Description: {description}</p>
    <p>Available Times: {availableTimes.join(', ')}</p>
    <p>Duration: {duration}</p>
    <p>Eligibility: {eligibility}</p>
  </div>
);

export const SchedulableStudyCard = ({
  study,
}: {
  readonly study: AppStudyWithOccupiedTimes;
}): ReactElement => {
  const mySchedules = useMySchedulesFromFirestore().filter((it) => it.studyID === study.id);
  const myScheduleForThisStudy = mySchedules.length === 0 ? null : mySchedules[0];

  const [showSchedule, setShowSchedule] = useState(false);

  const availableTimeFilteredStudy: AppStudy = (() => {
    const { occupiedTimes, ...filtered } = study;
    return {
      ...filtered,
      availableTimes: filtered.availableTimes.filter((it) => !occupiedTimes.includes(it)),
    };
  })();

  const onScheduleButtonClick = (): void => {
    if (myScheduleForThisStudy) {
      firebase
        .firestore()
        .collection('schedules')
        .doc(myScheduleForThisStudy.id)
        .delete()
        .then(() => {
          // eslint-disable-next-line no-alert
          alert('Successfully cancelled your scheduled study.');
          location.reload();
        });
    } else {
      setShowSchedule(true);
    }
  };

  return (
    <div className={`card ${styles.StudyCard}`}>
      <div className="card__image">
        <img src={PLACEHOLDER_IMAGE} alt="Random Study" />
      </div>
      {showSchedule ? (
        <div className="card__body">
          <h3>{`Pick a time for study "${study.projectName}"`}</h3>
        </div>
      ) : (
        <StudyCardContent study={availableTimeFilteredStudy} />
      )}
      <div className="card__footer">
        {!showSchedule && (
          <button className="button button--primary button--block" onClick={onScheduleButtonClick}>
            {myScheduleForThisStudy ? 'Unschedule' : 'Schedule'}
          </button>
        )}
        {showSchedule && (
          <StudyCardInlineSchedular
            study={availableTimeFilteredStudy}
            onScheduled={() => setShowSchedule(false)}
          />
        )}
      </div>
    </div>
  );
};

export const EditableStudyCard = ({ study }: { readonly study: AppStudy }): ReactElement => {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <div className={`card ${styles.StudyCard}`}>
      <div className="card__image">
        <img src={PLACEHOLDER_IMAGE} alt="Random Study" />
      </div>
      {!showEdit && <StudyCardContent study={study} />}
      {showEdit && <StudyCardInlineEditor study={study} onSubmitted={() => setShowEdit(false)} />}
      <div className="card__footer">
        {!showEdit && (
          <button
            className="button button--primary button--block"
            onClick={() => setShowEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
