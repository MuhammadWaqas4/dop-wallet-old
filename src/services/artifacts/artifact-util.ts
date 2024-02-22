import {
  ArtifactName,
  ArtifactMapping,
} from 'dop-sharedmodels';
import brotliDecompress from 'brotli/decompress';

const IPFS_GATEWAY = 'https://ipfs-lb.com';

// const MASTER_IPFS_HASH_ARTIFACTS = 'QmeBrG7pii1qTqsn7rusvDiqXopHPjCT9gR4PsmW7wXqZq';
// const MASTER_IPFS_HASH_ARTIFACTS = 'QmYsMzH1PkC8eQq8nZthZb4us6C9M2JYNjhBspUPHjpkdn';
// const MASTER_IPFS_HASH_ARTIFACTS = 'QmNqY8bHBEHgj96GSU1eyMtyZo1z5yTaM7yjQ7F1TbKE1W';
const MASTER_IPFS_HASH_ARTIFACTS = 'QmWCEfpErAxiVBzzXv7y98rgFUP7tjDcTN2Gi6jBPHKyHc';
// QmRJrPzD2hUmsWr7fHLsrQAJZm5J1xwji1vE2u4VFgmQcx


export const artifactDownloadsDir = (artifactVariantString: string) => {
  return `artifacts-v2.1/${artifactVariantString}`;
};

export const getArtifactVariantString = (
  nullifiers: number,
  commitments: number,
) => {
  return `${nullifiers}x${commitments}`;
};

export const artifactDownloadsPath = (
  artifactName: ArtifactName,
  artifactVariantString: string,
): string => {
  switch (artifactName) {
    case ArtifactName.WASM:
      return `${artifactDownloadsDir(artifactVariantString)}/wasm`;
    case ArtifactName.ZKEY:
      return `${artifactDownloadsDir(artifactVariantString)}/zkey`;
    case ArtifactName.VKEY:
      return `${artifactDownloadsDir(artifactVariantString)}/vkey.json`;
    case ArtifactName.DAT:
      return `${artifactDownloadsDir(artifactVariantString)}/dat`;
  }
};

export const getArtifactDownloadsPaths = (
  artifactVariantString: string,
): ArtifactMapping => {
  return {
    [ArtifactName.ZKEY]: artifactDownloadsPath(
      ArtifactName.ZKEY,
      artifactVariantString,
    ),
    [ArtifactName.WASM]: artifactDownloadsPath(
      ArtifactName.WASM,
      artifactVariantString,
    ),
    [ArtifactName.VKEY]: artifactDownloadsPath(
      ArtifactName.VKEY,
      artifactVariantString,
    ),
    [ArtifactName.DAT]: artifactDownloadsPath(
      ArtifactName.DAT,
      artifactVariantString,
    ),
  };
};

export const decompressArtifact = (arrayBuffer: ArrayBuffer): Uint8Array => {
  const decompress = brotliDecompress as (input: Uint8Array) => Uint8Array;
  return decompress(Buffer.from(arrayBuffer));
};

const getArtifactIPFSFilepath = (
  artifactName: ArtifactName,
  artifactVariantString: string,
) => {
  switch (artifactName) {
    case ArtifactName.ZKEY:
      return `${artifactVariantString}/zkey.br`;
    case ArtifactName.WASM:
      return `prover/snarkjs/${artifactVariantString}.wasm.br`;
    case ArtifactName.VKEY:
      return `${artifactVariantString}/vkey.json`;
    case ArtifactName.DAT:
      return `prover/native/${artifactVariantString}.dat.br`;
  }
  throw new Error('Invalid artifact.');
};

export const getArtifactUrl = (
  artifactName: ArtifactName,
  artifactVariantString: string,
) => {
  const artifactFilepath = getArtifactIPFSFilepath(
    artifactName,
    artifactVariantString,
  );
  return `${IPFS_GATEWAY}/ipfs/${MASTER_IPFS_HASH_ARTIFACTS}/${artifactFilepath}`;
};