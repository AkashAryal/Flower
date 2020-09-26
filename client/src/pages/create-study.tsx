import React, { ReactElement } from 'react';

import { hasIRB } from '../actions/auth-actions';
import StudyEditor from '../components/StudyEditor';
import firebase from '../fbConfig';
import { useUser } from '../hooks/user';

const initialStudy: AppStudyWithoutIDOwner = {
  projectName: '',
  duration: '',
  rewards: '',
  avaliableTimes: [],
  description: '',
  eligibility: '',
};

const CreateStudy = (): ReactElement => {
  const { email: owner } = useUser();

  const onSubmit = async (appStudyWithoutOwner: AppStudyWithoutIDOwner) => {
    if (!hasIRB()) {
      // eslint-disable-next-line no-alert
      alert('Please upload your IRB certificate before publishing study');
      return;
    }

    const appStudy: AppStudyWithoutID = { owner, ...appStudyWithoutOwner };
    await firebase.firestore().collection('studies').add(appStudy);
    // eslint-disable-next-line no-alert
    alert('You have successfully published a study.');
  };

  return (
    <div className="card centered-card">
      <div className="card__header">
        <h4>Create Study</h4>
      </div>
      <div className="card__body">
        <StudyEditor initialStudy={initialStudy} submitButtonName="Publish" onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default CreateStudy;
