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

  return <StudyEditor initialStudy={initialStudy} submitButtonName="Publish" onSubmit={onSubmit} />;
};

export default CreateStudy;
