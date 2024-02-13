import { NETWORK_CONFIG, NetworkName } from 'dop-sharedmodels';
import { getEngine } from './engine';

export type EncryptData = {
  txid: string;
  hash: string;
  timestamp: Optional<number>;
};

export const getAllEncrypts = async (
  networkName: NetworkName,
  startingBlock: number,
) => {
  const engine = getEngine();
  const { chain } = NETWORK_CONFIG[networkName];
  const encryptCommitments = await engine.getAllEncryptCommitments(
    chain,
    startingBlock,
  );

  return encryptCommitments.map(commitment => {
    const encryptData: EncryptData = {
      txid: commitment.txid,
      hash: commitment.hash,
      timestamp: commitment.timestamp,
    };
    return encryptData;
  });
};
