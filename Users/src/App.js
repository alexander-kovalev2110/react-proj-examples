import React, {useState, useEffect} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

const url= 'https://reqres.in/api/users';           // List of users 

function App() {
const [users, setUsers] = useState([]);             // Users
const [invites, setInvites] = useState([]);         // Invited Users
const [isLoading, setLoading] = useState(true);
const [success, setSuccess] = useState(false);      // Opening Success window
const [searchValue, setsearchValue] = useState(''); // Search text

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

  const onChangeSearchValue = (event) => {
    setsearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  };

  const onClickSendIvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {
        success ? (
          <Success count={invites.length} />
      ) : (
          <Users 
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue} 
            items={users} 
            isLoading={isLoading}
            invites={invites}
            onClickInvite={onClickInvite}
            onClickSendIvites={onClickSendIvites} 
          />
        )
      }
    </div>
  );
}

export default App;
