import React, { ReactElement } from 'react';

import firebase from '../fbConfig';

type Props = {
  readonly study: AppStudy;
  readonly onScheduled: () => void;
};

const StudyCardInlineSchedular = ({
  study: { id: studyID, availableTimes },
  onScheduled,
}: Props): ReactElement => {
  const chooseTime = async (timeSlot: string) => {
    firebase
      .functions()
      .httpsCallable('createStudySchedule')({ studyID, timeSlot })
      .then((r) => {
        if (r.data?.status === 'SUCCESS') {
          // eslint-disable-next-line no-alert
          alert('Successfully scheduled your study!');
          location.reload();
        } else {
          // eslint-disable-next-line no-alert
          alert('Failed to schedule your study!');
          onScheduled();
        }
      });
  };

  if (availableTimes.length > 0) {
    return (
      <div className="button-group button-group--block">
        {availableTimes.map((time, index) => (
          <button key={index} className="button button--secondary" onClick={() => chooseTime(time)}>
            {time}
          </button>
        ))}
      </div>
    );
  }

  return (
    <button className="button button--primary button--block" onClick={onScheduled}>
      Cancel since there is no time available
    </button>
  );
};

export default StudyCardInlineSchedular;
