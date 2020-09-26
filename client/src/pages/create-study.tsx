import React, { ReactElement, useState } from 'react';

import { hasIRB } from '../actions/auth-actions';
import firebase from '../fbConfig';
import { useUser } from '../hooks/user';

const CreateStudy = (): ReactElement => {
  const { email: owner } = useUser();

  const [projectName, setProjectName] = useState('');
  const [duration, setDuration] = useState('');
  const [rewards, setRewards] = useState('');
  const [avaliableTimes, setAvaliableTimes] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');

  // Disable submit if some fields are empty.
  const submitShouldBeDisabled = [
    projectName,
    duration,
    rewards,
    avaliableTimes,
    description,
    eligibility,
  ]
    .map((it) => it.trim())
    .some((it) => it.length === 0);

  const handleSubmit = () => {
    if (!hasIRB()) {
      // eslint-disable-next-line no-alert
      alert('Please upload your IRB certificate before publishing study');
      return;
    }

    const appStudy: AppStudyWithoutID = {
      owner,
      projectName,
      duration,
      rewards,
      avaliableTimes: avaliableTimes.split(',').map((it) => it.trim()),
      description,
      eligibility,
    };
    firebase
      .firestore()
      .collection('studies')
      .add(appStudy)
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('You have successfully published a study.');
        setProjectName('');
        setDuration('');
        setRewards('');
        setAvaliableTimes('');
        setDescription('');
        setEligibility('');
      });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="fname">Project Name</label>
      <br />
      <input type="text" onChange={(e) => setProjectName(e.target.value)} />
      <br />

      <label htmlFor="lname">Participation Duration</label>
      <br />
      <input type="text" onChange={(e) => setDuration(e.target.value)} />
      <br />

      <label htmlFor="lname">Rewards Type</label>
      <br />
      <input type="text" onChange={(e) => setRewards(e.target.value)} />
      <br />

      <label htmlFor="lname">Avaliable Times (comma separated)</label>
      <br />
      <input type="text" onChange={(e) => setAvaliableTimes(e.target.value)} />
      <br />

      <label htmlFor="subject">Description</label>
      <br />
      <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
      <br />

      <label htmlFor="subject">Eligibility</label>
      <br />
      <textarea onChange={(e) => setEligibility(e.target.value)}></textarea>
      <br />

      <input
        type="submit"
        value="Publish"
        disabled={submitShouldBeDisabled}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CreateStudy;
