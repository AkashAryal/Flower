import React, { ReactElement, useEffect, useState } from 'react';

import Study from '../components/Study';
import firebase from '../fbConfig';

const Studies = (): ReactElement => {
  const [studies, setStudies] = useState<AppStudyWithoutID[]>([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('studies')
      .onSnapshot((documents) => {
        setStudies(documents.docs.map((it) => ({ ...it.data(), id: it.id } as AppStudy)));
      });
  }, []);

  // TODO: trending
  const getTrending = () => {
    return studies;
  };

  // TODO: trending
  const getRecommended = () => {
    return studies;
  };

  return (
    <div>
      <p style={{ fontWeight: 'bolder' }}>Trending</p>
      <br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {getTrending().map((study: AppStudyWithoutID) => {
          return (
            <div key={study.projectName}>
              <Study study={study} />
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <p style={{ fontWeight: 'bolder' }}>You may be interested in</p>
      <br />
      {getRecommended().map((study: AppStudyWithoutID) => {
        return (
          <div key={study.projectName}>
            <Study study={study} />
          </div>
        );
      })}
    </div>
  );
};

export default Studies;
