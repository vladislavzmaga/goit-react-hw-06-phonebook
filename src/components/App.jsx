import React from 'react';
import { Form } from './Form/Form';
import { Wrapper } from './Box/Box';
import { Section } from './Section/Section';
import { ContactsList } from './Contacts/Contacts';
import { Filter } from './Filter/filter';
import { useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  return (
    <Wrapper>
      <Section title={'Phonebook'}>
        <Form />
      </Section>
      {contacts.length > 0 && (
        <Section title={'Contacts'}>
          <Filter title={'Find contacts by name'} />
          <ContactsList />
        </Section>
      )}
    </Wrapper>
  );
};
