import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [supervisors, setSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState();
  
  const GetSupervisors = async() => {
    const result = await axios.get('/api/supervisors');
    setSupervisors(result.data);
  }

  const PostSupervisorData = async() => {
    let supervisor = {};
    for (let i = 0; i < supervisors.length; i++) {
      if (`${supervisors[i].firstName} ${supervisors[i].lastName}` === selectedSupervisor) {
        supervisor = supervisors[i];
      }
    }
    await axios.post('/api/submit', supervisor)
    .catch(err => {
      throw err;
    })
  }

  useEffect(() => {
    GetSupervisors();
  }, [supervisors])

  return (
    <div style={managementPage}>
    <div style={formCard}>
    <header style={formHeader}><p>Notification Form</p></header>
    <div style={formBody}>
    <div style={personalInfo}>
      <label htmlFor="first name" style={{display: "flex", flexDirection: "column", width: "30%"}}>
      First Name
      <input type="text" id="name" name="name"></input>
      </label>
      <label htmlFor="last name" style={{display: "flex", flexDirection: "column", width: "30%"}}>
      Last Name
      <input type="text" id="name" name="name"></input>
      </label>
    </div>
      <label htmlFor="Notification Method">
      How would you prefer to be notified?
      </label>
    <div style={contactInfo}>
      <div style={contactChoices}>
      <div style={{display: "flex", flexDirection: "column"}}>
      <label htmlFor="email">
      <input type="checkbox" id="email" name="Email"></input>
      Email
      </label>
      <input type="text" id="emailInput" name="EmailInput"></input>
      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
      <label htmlFor="phoneNumber">
      <input type="checkbox" id="phone" name="Phone"></input>
      Phone Number
      </label>
      <input type="text" id="phoneInput" name="phoneInput"></input>
      </div>
      </div>
    </div>
    <div style={supervisorSelect}>
    Supervisor
    <form>
    <select onChange={(e) => {
      const selected = e.target.value.slice(2, e.target.value.length);
      console.log(selected);
        setSelectedSupervisor(selected);
      }}>
      <option>Select...</option>
    {supervisors.map((supervisor, id) => {
        return <option key={id}>{supervisor.jurisdiction} {supervisor.firstName} {supervisor.lastName}</option>
    })}
    </select>
    </form>
    <button onClick={() => PostSupervisorData()}>Submit</button>
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;

const managementPage = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
}

const formBody = {
  paddingTop: "50px",
  paddingLeft: "30px",
  paddingRight: "30px",
}

const formCard = {
  display: "flex",
  flexDirection: "column",
  width: "75vw",
  height: "75vh",
  backgroundColor: "#C7D2D6",
}

const formHeader = {
  backgroundColor: "#6A7F84",
  width: "100%",
  height: "5vh",
  textAlign: "center",
}

const personalInfo = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}

const contactInfo = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
}

const contactChoices = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}

const supervisorSelect = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}
