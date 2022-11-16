import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Wrapper } from './Box/Box';
import { Section } from './Section/Section';
import { ContactsList } from './Contacts/Contacts';
import { Filter } from './Filter/filter';
import users from '../../src/contacts.json';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? users
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    newContact.id = nanoid();
    setContacts(prevState => {
      let isContains = false;
      let updateContacts = [];
      prevState.forEach(({ name }) => {
        if (name.toLowerCase() === newContact.name.toLowerCase()) {
          Notiflix.Report.failure(
            'Error',
            `${name} is already in contacts`,
            'close'
          );
          isContains = true;
        }
      });
      isContains
        ? (updateContacts = [...prevState])
        : (updateContacts = [newContact, ...prevState]);
      return updateContacts;
    });
  };

  const searchByName = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = evt => {
    const currentContact = evt.currentTarget.dataset.id;
    setContacts(contacts.filter(contact => contact.id !== currentContact));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <Wrapper>
      <Section title={'Phonebook'}>
        <Form onSubmit={addContact} />
      </Section>
      {contacts.length > 0 && (
        <Section title={'Contacts'}>
          <Filter title={'Find contacts by name'} searchByName={searchByName} />
          <ContactsList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </Section>
      )}
    </Wrapper>
  );
};
