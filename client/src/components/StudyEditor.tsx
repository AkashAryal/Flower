import React, { ReactElement, useState } from 'react';

type Props = {
  readonly initialStudy: AppStudyWithoutIDOwner;
  readonly submitButtonName: string;
  readonly onSubmit: (appStudy: AppStudyWithoutIDOwner) => void;
};

const StudyEditor = ({ initialStudy, submitButtonName, onSubmit }: Props): ReactElement => {
  const [projectName, setProjectName] = useState(initialStudy.projectName);
  const [duration, setDuration] = useState(initialStudy.description);
  const [rewards, setRewards] = useState(initialStudy.rewards);
  const [avaliableTimes, setAvaliableTimes] = useState(initialStudy.avaliableTimes.join(','));
  const [description, setDescription] = useState(initialStudy.description);
  const [eligibility, setEligibility] = useState(initialStudy.eligibility);

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

  const handleSubmit = () =>
    onSubmit({
      projectName,
      duration,
      rewards,
      avaliableTimes: avaliableTimes.split(',').map((it) => it.trim()),
      description,
      eligibility,
    });

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
        value={submitButtonName}
        disabled={submitShouldBeDisabled}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default StudyEditor;
