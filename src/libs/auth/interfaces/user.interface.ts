import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export type IUserIdentity = Pick<DecodedIdToken, 'uid'>;
