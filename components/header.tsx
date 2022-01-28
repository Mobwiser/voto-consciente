import React from 'react';
import {MenuToggle} from './menu-toggle';

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return <MenuToggle toggle={toggle} isOpen={isOpen}></MenuToggle>;
};
