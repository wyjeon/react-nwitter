import React, { useState } from 'react';
import { dbService } from 'fBase';
const Home = () => {
  const [nweet, setNweet] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      nweet: nweet,
      createdAt: Date.now(),
    });
    setNweet('');
  };

  const onchange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onchange} type="text" placeholder="what's on youre mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;
