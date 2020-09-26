import React, { ReactElement } from 'react';

type P = {
  study: AppStudyWithoutID;
};

const Study = (props: P): ReactElement => {
  return (
    <div>
      <img src="https://i.imgur.com/SR0YwEv.jpg" alt="study" />
      <p style={{ fontWeight: 'bolder' }}>{props.study.projectName}</p>
      <p>Rewards: {props.study.rewards}</p>
      <p>Description: {props.study.description}</p>
      <p>Description: {props.study.avaliableTimes}</p>
      <p>Duration: {props.study.duration}</p>
      <p>Eligibility: {props.study.eligibility}</p>
      <p>Owner: {props.study.owner} </p>
    </div>
  );
};

export default Study;
