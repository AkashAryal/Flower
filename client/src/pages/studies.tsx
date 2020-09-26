/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';

import Study from '../components/Study';
import firebase from '../fbConfig';

const Studies = (): ReactElement => {
  const [studies, setStudies] = useState<AppStudyWithoutID[]>([]);

  useEffect(() => {
    getAllStudies();
  }, []);

  const getAllStudies = (): void => {
    firebase
      .firestore()
      .collection('studies')
      .onSnapshot((doc) => {
        const data: AppStudyWithoutID[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        doc.forEach((d: any) => data.push(d.data()));
        setStudies(data);
      });
  };

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
      TOP BAR
      <br />
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
