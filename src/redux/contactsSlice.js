import users from '../../src/contacts.json';

import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: users,
    filter: '',
  },
  reducers: {
    addContacts(state, action) {
      state.contacts.unshift(action.payload);
    },
    deleteContacts(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
    },
    filteredContacts(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const persistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContacts, deleteContacts, filteredContacts } =
  contactsSlice.actions;
