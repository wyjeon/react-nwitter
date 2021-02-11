import React, { useState, useEffect } from 'react';
import { dbService } from 'fBase';
import Nweets from 'components/Nweets';
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet('');
  };

  const onchange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {};
    reader.readAsDataURL(theFile);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onchange} type="text" placeholder="what's on youre mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweets key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
