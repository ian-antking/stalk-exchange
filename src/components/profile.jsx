import React from 'react';
import DailyPriceChart from './daily-price-chart';
import LoadingCard from './loading-card';
import queryString from 'query-string'
import { Redirect } from 'react-router-dom';

const Profile = props => {
  const values = queryString.parse(props.location.search)
  const id = values.id;
  const user = props.users?.find(user => user._id === id);

  if (!props.loggedIn) return <Redirect to='/' />

  return (
    user ? <DailyPriceChart user={user} /> : <LoadingCard />
  )
}

export default Profile;
