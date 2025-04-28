import React, {useState, useEffect} from 'react';
import './index.scss';
import { Skeleton } from './components/Skeleton';
import { Success } from './components/Success';
import { Users } from './components/Users';

const url= 'https://reqres.in/api/users';           // List of users 

export const App = () => {
  const [isLoading, setLoading] = useState(true);     // Loading indicator
  const [users, setUsers] = useState([]);             // Users
  const [invites, setInvites] = useState([]);         // Invited Users
  const [success, setSuccess] = useState(false);      // Opening Success window

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setUsers(json.data);
      })
      .catch(err => {
        console.warn(err);
        alert('Getting users Error')
      })
      .finally(() => setLoading(false));
  }, []);

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  };

  const onClickSendIvitation = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          users={users}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendIvitation={onClickSendIvitation}
        />
      )}
    </div>
  ); 
}
