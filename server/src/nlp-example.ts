import computeInterestVector from './nlp-process';

const EXAMPLE_TEXT = `
CS 2112/ENGRD 2112 is an honors version of CS 2110/ENGRD 2110.
Credit is given for only one of 2110 and 2112.
Transfer between 2110 and 2112 (in either direction) is encouraged during the first three weeks.
We cover intermediate software design and introduce some key computer science ideas.
The topics are similar to those in 2110 but are covered in greater depth with more challenging assignments.
Topics include object-oriented programming, program structure and organization, program reasoning
using specifications and invariants, recursion, design patterns, concurrent programming, graphical
user interfaces, data structures, sorting and graph algorithms, asymptotic complexity, and simple
algorithm analysis. Java is the principal programming language.
`;

computeInterestVector(EXAMPLE_TEXT).then((vector) =>
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(vector, undefined, 2))
);
