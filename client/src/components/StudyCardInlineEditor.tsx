import React, { ReactElement } from 'react';

import firebase from '../fbConfig';
import StudyEditor from './StudyEditor';

type Props = {
  readonly study: AppStudy;
  readonly onSubmitted: () => void;
};

const StudyCardInlineEditor = ({ study, onSubmitted }: Props): ReactElement => {
  const onSubmit = (appStudyWithoutOwner: AppStudyWithoutIDOwner): void => {
    const appStudy: AppStudyWithoutID = { owner: study.owner, ...appStudyWithoutOwner };
    firebase.firestore().collection('studies').doc(study.id).set(appStudy);
    onSubmitted();
  };

  return (
    <div className="card__body">
      <StudyEditor initialStudy={study} submitButtonName="Update" onSubmit={onSubmit} />
    </div>
  );
};

export default StudyCardInlineEditor;
