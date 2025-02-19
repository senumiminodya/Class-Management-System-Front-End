import React, { useContext } from 'react';
import UserContext from './UserContext';

export const Sample = () => {
  const { currentUser } = useContext(UserContext); // Correctly access currentUser from the context

  return (
    <div>
      <h1>{currentUser?.id}</h1> {/* Use optional chaining to avoid errors if currentUser is null */}
    </div>
  );
};
