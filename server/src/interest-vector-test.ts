import { cosineSimilarity } from './interest-vector';

// 45 deg, cos(45deg) = sqrt(2) / 2 ~= 0.707
// eslint-disable-next-line no-console
console.log(cosineSimilarity({ cs2110: 1, cs2112: 1 }, { cs2112: 1 }));
