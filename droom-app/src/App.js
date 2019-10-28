import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import FormikLoginForm from './components/CompanyLogin'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Route exact path='/' component={FormikLoginForm} />
      {/* <Route path='/companies/:user_id' component={CompanyProfile} />
      <Route path='/locations' component={LocationList} />
      <Route path='/episodes' component={EpisodeList} /> */}
      </header>
    </div>
  );
}

/*

Seeker btn
Company btn

Seeker login (no function)

Company Login (onClick: redirect to company login form)

Company login form
 GET backend  (if else)
    usename field
    Password field
    Login btn


  **Successful Login**

  Company profile
    Hello, Company.name
      location
      description
      ...get stuff

    jobs btn (no functionality)
    seeker btn (no functionality)

*/