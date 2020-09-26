import React, { ReactElement, useEffect, useState } from 'react';

import LoadingRing from '../components/LoadingRing';
import { SchedulableStudyCard, EditableStudyCard } from '../components/StudyCard';
import firebase from '../fbConfig';
import { useUser } from '../hooks/user';
import styles from './studies.module.css';

const StudiesPage = (): ReactElement => {
  const { email: owner } = useUser();
  const [trendingStudies, setTrendingStudies] = useState<
    readonly AppStudyWithOccupiedTimes[] | undefined
  >();
  const [interestedStudies, setInterestedStudies] = useState<
    readonly AppStudyWithOccupiedTimes[] | undefined
  >();
  const [myStudies, setMyStudies] = useState<readonly AppStudy[] | undefined>();

  useEffect(() => {
    firebase
      .functions()
      .httpsCallable('getTrending')()
      .then((r) => setTrendingStudies(r.data));
    firebase
      .functions()
      .httpsCallable('getInterested')()
      .then((r) => setInterestedStudies(r.data));
    firebase
      .firestore()
      .collection('studies')
      .where('owner', '==', owner)
      .onSnapshot((snapshot) =>
        setMyStudies(snapshot.docs.map((it) => ({ ...it.data(), id: it.id } as AppStudy)))
      );
  }, [owner]);

  return (
    <div>
      <h2 className={styles.StudiesSectionHeader}>Trending</h2>
      {trendingStudies ? (
        <div className={styles.StudiesContainer}>
          {trendingStudies.map((study) => {
            return (
              <div key={study.id}>
                <SchedulableStudyCard study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingRing />
      )}
      <h2 className={styles.StudiesSectionHeader}>You may be interested in</h2>
      {interestedStudies ? (
        <div className={styles.StudiesContainer}>
          {interestedStudies.map((study) => {
            return (
              <div key={study.id}>
                <SchedulableStudyCard study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingRing />
      )}
      <h2 className={styles.StudiesSectionHeader}>My Studies</h2>
      {myStudies ? (
        <div className={styles.StudiesContainer}>
          {myStudies.map((study) => {
            return (
              <div key={study.id}>
                <EditableStudyCard study={study} />
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingRing />
      )}
    </div>
  );
};

export default StudiesPage;
