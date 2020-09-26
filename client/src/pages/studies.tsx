import React, { ReactElement, useEffect, useState } from 'react';

import StudyCard from '../components/StudyCard';
import firebase from '../fbConfig';
import styles from './studies.module.css';

const StudiesPage = (): ReactElement => {
  const [trendingStudies, setTrendingStudies] = useState<readonly AppStudy[] | undefined>();
  const [interestedStudies, setInterestedStudies] = useState<readonly AppStudy[] | undefined>();

  useEffect(() => {
    firebase
      .functions()
      .httpsCallable('getTrending')()
      .then((r) => setTrendingStudies(r.data));
    firebase
      .functions()
      .httpsCallable('getInterested')()
      .then((r) => setInterestedStudies(r.data));
  }, []);

  return (
    <div>
      <h2 className={styles.StudiesSectionHeader}>Trending</h2>
      {trendingStudies ? (
        <div className={styles.StudiesContainer}>
          {trendingStudies.map((study) => {
            return (
              <div key={study.id}>
                <StudyCard type="schedulable" study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
      <h2 className={styles.StudiesSectionHeader}>You may be interested in</h2>
      {interestedStudies ? (
        <div className={styles.StudiesContainer}>
          {interestedStudies.map((study) => {
            return (
              <div key={study.id}>
                <StudyCard type="schedulable" study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default StudiesPage;
