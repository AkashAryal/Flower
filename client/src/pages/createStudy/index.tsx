import React, { ReactElement, useState } from 'react';

import { hasIRB } from '../../actions/auth/authActions';

const CreateStudy = (): ReactElement => {
  const [projectName, setProjectName] = useState('');
  const [duration, setDuration] = useState('');
  const [rewards, setRewards] = useState('');
  const [avaliableTimes, setAvaliableTimes] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // eslint-disable-next-line no-console
    console.log(
      projectName,
      ' ',
      duration,
      ' ',
      rewards,
      ' ',
      avaliableTimes,
      ' ',
      description,
      ' ',
      eligibility
    );

    if (!hasIRB()) {
      setError('Please upload your IRB certificate before publishing study');
      // eslint-disable-next-line no-useless-return
      return;
    }
    // continue and verify contents here

    // some backend stuff
  };
  return (
    <div style={{ textAlign: 'center' }}>
      {error && <div>{error}</div>}
      <img src="https://i.imgur.com/SR0YwEv.jpg" alt="" />
      <br />
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

      <label htmlFor="lname">Avaliable Times</label>
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

      <input type="submit" value="Publish" onClick={handleSubmit} />
    </div>
  );
};

export default CreateStudy;
