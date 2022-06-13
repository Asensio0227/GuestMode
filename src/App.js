import React, { useEffect, useState } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
  FaGenderless,
} from 'react-icons/fa'
import Navbar from './Navbar'
import Loading from './Loading'

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState('name');
  const [title, setTitle] = useState('random person');

  const getRandom = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      let person = data.results[0];
      const { phone, email } = person;
      const { dob: age } = person;
      const { first, last } = person.name;
      const { street: { number, name } } = person.location;
      const { password } = person.login;
      const { large: image } = person.picture;
      const newPerson = {
        phone,
        email,
        name: `${first}, ${last}`,
        street: `${number}, ${name}`,
        password,
        age,
        image
      }
      setPerson(newPerson);
      setTitle(newPerson.name);
      setValue('name');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getRandom();
  },[])

  if (isLoading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  }

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.classList.contains) {
      const newValues = event.target.dataset.label;
      setValue(newValues);
      setTitle(person[newValues]);
    }
  }

  return (
    <>
      <Navbar />
      <div className="block bcg-black"></div>
      <section className="block">
        <div className="container">
          <div className="img-container">
            <img src={(person && person.image) || defaultImage} alt={person.name} />
            <p className="user-value">My {value} is</p>
            <p className="user-title">{title}</p>
            <div className="values-list">
              <button
                type='button'
                className="icon"
                data-label='name'
                onMouseOver={handleChange}
              >
                <FaUser/>
              </button>
              <button
                type='button'
                className="icon"
                data-label='street'
                onMouseOver={handleChange}
              >
                <FaMap/>
              </button>
              <button
                type='button'
                className="icon"
                data-label='email'
                onMouseOver={handleChange}
              >
                <FaEnvelopeOpen/>
              </button>
              <button
                type='button'
                className="icon"
                data-label='password'
                onMouseOver={handleChange}
              >
                <FaLock/>
              </button>
              <button
                type='button'
                className="icon"
                data-label='phone'
                onMouseOver={handleChange}
              >
                <FaPhone/>
              </button>
            </div>
            <button
              type='button'
              className="btn"
              onClick={getRandom}
            >
              suprise me
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default App