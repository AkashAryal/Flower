import React, { ReactElement, useState } from 'react';

type Props = {
  readonly initialStudy: AppStudyWithoutIDOwner;
  readonly submitButtonName: string;
  readonly onSubmit: (appStudy: AppStudyWithoutIDOwner) => void;
};

const StudyEditor = ({ initialStudy, submitButtonName, onSubmit }: Props): ReactElement => {
  const [projectName, setProjectName] = useState(initialStudy.projectName);
  const [duration, setDuration] = useState(initialStudy.duration);
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
    <>
      <div className="input-row">
        <label htmlFor="create-study-project-name-input">Project Name</label>
        <input
          id="create-study-project-name-input"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="input-row">
        <label htmlFor="create-study-duration-input">Participation Duration</label>
        <input
          id="create-study-duration-input"
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="input-row">
        <label htmlFor="create-study-rewards-input">Rewards Type</label>
        <input
          id="create-study-rewards-input"
          type="text"
          value={rewards}
          onChange={(e) => setRewards(e.target.value)}
        />
      </div>
      <div className="input-row">
        <label htmlFor="create-study-available-times-input">
          Avaliable Times (comma separated)
        </label>
        <input
          id="create-study-available-times-input"
          type="text"
          value={avaliableTimes}
          onChange={(e) => setAvaliableTimes(e.target.value)}
        />
      </div>
      <div className="input-row">
        <label htmlFor="create-study-description-input">Description</label>
        <textarea
          id="create-study-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-row">
        <label htmlFor="create-study-eligibility-input">Eligibility</label>
        <textarea
          id="create-study-eligibility-input"
          value={eligibility}
          onChange={(e) => setEligibility(e.target.value)}
        />
      </div>

      <div className="input-row">
        <button
          className="button button--primary button--block"
          disabled={submitShouldBeDisabled}
          onClick={handleSubmit}
        >
          {submitButtonName}
        </button>
      </div>
    </>
  );
};

export default StudyEditor;
