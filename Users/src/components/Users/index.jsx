import React, {useState} from 'react';
import { User } from './User';

export const Users = ({ users, invites, onClickInvite, onClickSendIvitation }) => {
  const [searchValue, setSearchValue] = useState('');   // Search text

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input 
          value ={searchValue} 
          onChange={onChangeSearchValue} 
          type="text" 
          placeholder="Find user..." />
      </div>
        <ul className="users-list">
          {users.filter(user => {
            const fullName = (user.first_name + user.last_name).toLowerCase();

              return fullName.includes(searchValue.toLowerCase()) || user.email.toLowerCase().includes(searchValue.toLowerCase());

          }).map(user => (
              <User onClickInvite={onClickInvite} isInvited={invites.includes(user.id)} key={user.id} user={user} />
            ))}
        </ul>
      {invites.length > 0 && (
          <button onClick={onClickSendIvitation} className="send-invite-btn">
            Send invitation
          </button>
      )}
    </>
  );
};

