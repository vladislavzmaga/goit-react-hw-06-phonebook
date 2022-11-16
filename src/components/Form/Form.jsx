import PropTypes from 'prop-types';

import React, { useState } from 'react';

import { Forms, FormLable, FormInput, FormButton } from './Form.styled';

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hundleNameChange = evt => {
    setName(evt.target.value);
  };

  const hundleNumberChange = evt => {
    setNumber(evt.target.value);
  };

  const hundleSubmit = evt => {
    evt.preventDefault();
    const newContact = { name, number };
    onSubmit(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Forms onSubmit={hundleSubmit}>
      <FormLable>
        Name
        <FormInput
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={hundleNameChange}
        />
      </FormLable>
      <FormLable>
        Number
        <FormInput
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={hundleNumberChange}
        />
      </FormLable>
      <FormButton type="submit">Save contact</FormButton>
    </Forms>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
