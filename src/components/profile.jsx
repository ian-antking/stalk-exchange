import React from 'react';
import DailyPriceChart from './daily-price-chart';
import LoadingCard from './loading-card';

const Profile = props => {

  const id = props.match.params.id;
  const user = props.users?.find(user => user._id === id);
  return (
    user ? <DailyPriceChart user={user} /> : <LoadingCard />
  )
}

export default Profile;
