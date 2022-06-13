import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { links, social } from './data';

const Navbar = () => {
  const [showLink, setShowLink] = useState(false);
  const container = useRef(null);
  const linksRef = useRef(null);

  const handleChange = () => {
    setShowLink(!showLink);
  }

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;

    if (showLink) {
      container.current.style.height = `${linksHeight}px`;
    } else {
      container.current.style.height = `0`;
    }
  },[showLink])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h3>sky<span>coding</span></h3>
          <button className="nav-toggle" onClick={handleChange}>
            <FaBars />
          </button>
        </div>
        <div ref={container} className="links-container">
          <ul ref={linksRef} className="links">
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              )
            })}
          </ul>
        </div>
          <ul className="social-icons">
            {social.map((icons) => {
              const { id, url, icon } = icons;
              return (
                <li key={id}>
                  <a href={url}>
                    {icon}
                  </a>
                </li>
              )
            })}
          </ul>
      </div>
    </nav>
  );
};

export default Navbar
