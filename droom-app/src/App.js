import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import Header from './components/Header'

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

import CreateSeekerProfile from './components/CreateSeekerProfile';
import CreateCompanyProfile from './components/CreateCompanyProfile';

import CreateJobListing from './components/CreateJobListing';
import JobCard from './components/JobCard';



export default function App() {

  const [companies, setNewCompany] = useState([]);
  const [prospects, setProspects] = useState([]);
  const [members, setMembers] = useState();

  return (
    <div className='App'>
      <div className='App-header'>
        <Header />
        <Route exact path='/' render={props => <SignUp {...props} members={members} setMembers={setMembers} />} />
        <Route path='/employeeprofile' render={props => <CreateSeekerProfile {...props} setProspects={setProspects} prospects={prospects} /> } />
        <Route path='/companyprofile' render={props => <CreateCompanyProfile {...props} setNewCompany={setNewCompany} /> } />
        <Route path='/login' render={props => <LogIn {...props}  />} />
        <Route path='/newjob' render={props => <CreateJobListing {...props} companies={companies} /> } />

        <Route path={'/joblistings'} render={(props) => (
          <JobCard {...props} />
        )} />
      </div>
    </div>
  );
}

// Seeker btn
// Company btn

// Seeker login (no function)

// Company Login (onClick: redirect to company login form)

// Company login form
//  GET backend  (if else)
//     usename field
//     Password field
//     Login btn

//   **Successful Login**

//   Company profile
//     Hello, Company.name
//       location
//       description
//       ...get stuff

//     jobs btn (no functionality)
//     seeker btn (no functionality)