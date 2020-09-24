export type MutableDocumentInterestVector = Record<string, number>;
export type DocumentInterestVector = Readonly<MutableDocumentInterestVector>;

export const vectorDotProduct = (
  v1: DocumentInterestVector,
  v2: DocumentInterestVector
): number => {
  let sum = 0;
  Object.keys(v1).forEach((k1) => {
    sum += v1[k1] * (v2[k1] ?? 0);
  });
  return sum;
};

export const vectorNorm = (v: DocumentInterestVector): number =>
  Math.sqrt(
    Object.values(v)
      .map((i) => i * i)
      .reduce((a, b) => a + b, 0)
  );

export const cosineSimilarity = (v1: DocumentInterestVector, v2: DocumentInterestVector): number =>
  vectorDotProduct(v1, v2) / (vectorNorm(v1) * vectorNorm(v2));
