import language from '@google-cloud/language';

import { MutableDocumentInterestVector, DocumentInterestVector } from './interest-vector';

const GCLOUD_NLP_CLIENT = new language.LanguageServiceClient();

const computeInterestVector = async (text: string): Promise<DocumentInterestVector> => {
  const [analysisResult] = await GCLOUD_NLP_CLIENT.analyzeEntities({
    document: { content: text, type: 'PLAIN_TEXT' },
  });
  const interestVector: MutableDocumentInterestVector = {};
  (analysisResult.entities ?? []).forEach(({ name, salience }) => {
    if (name == null || salience == null) {
      return;
    }
    interestVector[name.toLocaleLowerCase()] = salience;
  });
  return interestVector;
};

export default computeInterestVector;
