import { difference } from 'ramda';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RESET_STORE } from '@/actions/resetStore';
import { INVITE_ACCEPTED, INVITE_REJECTED } from '@/utils/constants';

/* ******** INITIAL STATE ************** */

const initialState: GroupsState = {
  newGroupInvitees: [],
  groups: [],
  invites: [],
  searchParam: '',
  searchOpen: false,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    createGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    updateGroup(state, action: PayloadAction<Group>) {
      const group = state.groups.find(
        (group) => group.id === action.payload.id,
      );
      Object.assign(group, action.payload);
    },
    deleteGroup(state, action: PayloadAction<Group>) {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload.id,
      );
    },
    setNewGroupInvitees(state, action: PayloadAction<string[]>) {
      state.newGroupInvitees = action.payload;
    },
    clearNewGroupInvitees(state) {
      state.newGroupInvitees = [];
    },
    setGroups(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
    },
    updateMemberships(state, action: PayloadAction<MembershipInfo[]>) {
      state.groups.forEach((group) => {
        const membership = action.payload.find(
          (membership) => membership.id === group.id,
        );
        if (!membership && group.state === 'verified') {
          group.state = 'dismissed';
        }
      });
      action.payload.forEach((membership) => {
        const group = state.groups.find((group) => group.id === membership.id);
        if (group) {
          group.state = 'verified';
          group.joined = membership.timestamp;
        }
      });
    },
    joinGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    leaveGroup(state, action: PayloadAction<Group>) {
      const group = state.groups.find(
        (group) => group.id === action.payload.id,
      );
      group.state = 'dismissed';
    },
    dismissFromGroup(
      state,
      action: PayloadAction<{ member: string; group: Group }>,
    ) {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.group.id,
      );
      if (index !== -1) {
        state.groups[index].members = state.groups[index].members.filter(
          (member) => member !== action.payload.member,
        );
      }
    },
    addAdmin(state, action: PayloadAction<{ member: string; group: Group }>) {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.group.id,
      );
      if (index !== -1) {
        const { member } = action.payload;
        const { members, admins } = state.groups[index];

        if (members.includes(member) && !admins.includes(member)) {
          state.groups[index].admins.push(member);
        }
      }
    },
    setInvites(state, action: PayloadAction<Invite[]>) {
      state.invites = action.payload;
    },
    acceptInvite(state, action: PayloadAction<string>) {
      const index = state.invites.findIndex(
        (invite) => invite.id === action.payload,
      );
      if (index !== -1) state.invites[index].state = INVITE_ACCEPTED;
    },
    rejectInvite(state, action: PayloadAction<string>) {
      const index = state.invites.findIndex(
        (invite) => invite.id === action.payload,
      );
      if (index !== -1) state.invites[index].state = INVITE_REJECTED;
    },
    setGroupSearch(state, action: PayloadAction<string>) {
      state.searchParam = action.payload;
    },
    setGroupSearchOpen(state, action: PayloadAction<boolean>) {
      state.searchOpen = action.payload;
    },
  },
  extraReducers: {
    [RESET_STORE]: () => {
      return initialState;
    },
  },
});

// Export channel actions
export const {
  createGroup,
  updateGroup,
  deleteGroup,
  setNewGroupInvitees,
  clearNewGroupInvitees,
  setGroups,
  updateMemberships,
  joinGroup,
  leaveGroup,
  dismissFromGroup,
  addAdmin,
  setInvites,
  rejectInvite,
  acceptInvite,
  setGroupSearch,
  setGroupSearchOpen,
} = groupsSlice.actions;

// Export reducer
export default groupsSlice.reducer;