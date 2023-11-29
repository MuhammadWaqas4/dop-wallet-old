import { NETWORK_CONFIG, NetworkName } from 'dop-sharedmodels';
import { getEngine } from './engine';

export type ShieldData = {
  txid: string;
  hash: string;
  timestamp: Optional<number>;
};

export const getAllShields = async (
  networkName: NetworkName,
  startingBlock: number,
) => {
  const engine = getEngine();
  const { chain } = NETWORK_CONFIG[networkName];
  const shieldCommitments = await engine.getAllShieldCommitments(
    chain,
    startingBlock,
  );

  return shieldCommitments.map(commitment => {
    const shieldData: ShieldData = {
      txid: commitment.txid,
      hash: commitment.hash,
      timestamp: commitment.timestamp,
    };
    return shieldData;
  });
};
