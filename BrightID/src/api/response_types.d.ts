/**
 * Response Types
 */

type NodeApiRes =
  | AppRes
  | AppsRes
  | OperationPostRes
  | OperationRes
  | UserConnectionsRes
  | UserProfileRes
  | UserVerificationsRes
  | UserInvitesRes
  | UserMembershipsRes
  | GroupRes;

type AppRes = {
  data: AppInfo;
};

type AppsRes = {
  data: {
    apps: AppInfo[];
  };
};

type ErrRes = {
  code: number;
  errorMessage: string;
  errorNum: number;
};

type OperationPostRes = {
  data: {
    hash: string;
  };
};

type OperationRes = {
  data: OperationInfo;
};

type UserConnectionsRes = {
  data: {
    connections: ConnectionInfo[];
  };
};

type UserMembershipsRes = {
  data: {
    memberships: MembershipInfo[];
  };
};

type UserInvitesRes = {
  data: {
    invites: InviteInfo[];
  };
};

type UserVerificationsRes = {
  data: {
    verifications: Verification[];
  };
};

type UserProfileRes = {
  data: ProfileInfo;
};

type GroupRes = {
  data: GroupInfo;
};

/**
 * Info Types
 */

type AppInfo = {
  id: string;
  name: string;
  context: string;
  verifications: Array<string>;
  verificationUrl: string;
  logo?: string;
  url?: string;
  assignedSponsorships?: number;
  unusedSponsorships?: number;
  testing: boolean;
  idsAsHex: boolean;
  usingBlindSig: boolean;
  sponsorPublicKey: string;
};

type OperationInfo = {
  state: string;
  result: string;
};

type ConnectionInfo = {
  incomingLevel: ConnectionLevel;
  id: string;
  level: ConnectionLevel;
  timestamp: number;
  reportReason?: string;
};

type MembershipInfo = {
  id: string;
  timestamp: number;
};

type GroupInfo = {
  id: string;
  members: string[];
  invites: InviteInfo[];
  admins: string[];
  type: string;
  url: string;
  timestamp: number;
  seed?: boolean;
  region?: string;
  info?: string;
};

type InviteInfo = {
  id: string;
  group: string;
  inviter: string;
  invitee: number;
  timestamp: number;
  data: string;
};

type ProfileInfo = {
  id: string;
  connectionsNum: number;
  groupsNum: number;
  mutualConnections: string[];
  mutualGroups: string[];
  connectedAt: number;
  createdAt: number;
  reports: Array<{ id: string; reportReason: string }>;
  verifications: Verification[];
  signingKeys: string[];
  sponsored: boolean;
};