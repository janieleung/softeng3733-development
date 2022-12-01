import React from 'react';
import { layout } from './layout.js';
import Modal from "./Component/Modal";
import axios from "axios";

const list = [
  {
    id: 0,
    name: 'NinjaSe 2.0',
    type: 'Game',
    story: 'Bring NinjaSe to the masses',
    designer: 'George H',
    currentAmt: 0,
    goalAmt: '7000',
    deadline: '12-16-2022',
    pledges: [
      {
        amount: 0,
        description: 'description here'
      }
    ]
  },
  {
    id: 1,
    name: 'Wordy5',
    type: 'Game',
    story: 'Another way to waste time',
    designer: 'Jen S',
    currentAmt: 0,
    goalAmt: '5000',
    deadline: '12-01-2022',
  }
];

const instancep1 = axios.create({
  baseURL: 'https://sakv15k9hl.execute-api.us-east-1.amazonaws.com/Prod/'
});

const instancep2 = axios.create({
  baseURL: ' https://nxs9op302e.execute-api.us-east-1.amazonaws.com/Prod'
});


function App() {
  const refs = list.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});

  const [dbData, setdbData] = React.useState([]);

  // 0: Register designer, 1: Register Supporter, 2: Create Project, 3: Create Pledge, 4: Admin LogIn
  const [modalScreen, setModalScreen] = React.useState(0);
  const [showModal, setModal] = React.useState(false);  // true: show modal, false: hide modal

  const [loggedin, setLoggedIn] = React.useState('visitor');  // designer, supporter, admin, visitor

  // designer states
  const [inputRegDesigner, setinputRegDesigner] = React.useState('');
  const [inputRegDesignerPwd, setInputRegDesignerPwd] = React.useState('');
  const [designerView, setDesignerView] = React.useState(0);    // 0 : no project, 1: brief project, 2: project viewhttps://git-codecommit.us-east-1.amazonaws.com/v1/repos/crowdsourcing
  const [currDesigner, setCurrDesigner] = React.useState(''); // TODO: Identify designer 
  const [viewProjectName, setViewProjectName] = React.useState('NinjaSe 2.0');      // View project based on the name of the project
  const [pjPledge, setPjPledge] = React.useState([]);

  // admin states
  const [adminView, setAdminView] = React.useState(0);    // 0 : no project, 1: all project
  const [inputLogin, setInputLogin] = React.useState('');
  const [inputPwd, setInputPwd] = React.useState('');

  // supporter states
  const [inputRegSupporter, setinputRegSupporter] = React.useState('');
  const [inputRegSupporterPwd, setInputRegSupporterPwd] = React.useState('');

  // Register Window
  const showRegModal = id => {
    setModalScreen(id);                       // Tell Modal which screen to display
    setModal(!showModal);     // Show Modal
  };

  // Use Case: Register Stuff into Database
  const handleRegister = id => {
    // id = 0 = designer
    if (id === 0) {
      console.log("registering designer: ", inputRegDesigner, inputRegDesignerPwd);
      // TODO: LAMBDA FUNCTION REGISTER DESIGNER
      let msg = {}
      msg["name"] = inputRegDesigner;
      msg["email"] = inputRegDesignerPwd;
      let value = JSON.stringify(msg)
      let data = { 'body': value }

      instancep1.post("/registerDesigner", data)
        .then(function (response) {
          console.log("Designer has been registered");
          setLoggedIn('designer');
          setCurrDesigner(inputRegDesigner);
        })
        .catch(function (error) {
          console.log("Error: ", error)
        })

      setinputRegDesigner('');
      setInputRegDesignerPwd('');
      setModal(!showModal);
    }

    // id = 1 = supporter
    else if (id === 1) {
      console.log("registering supporter: ", inputRegSupporter, inputRegSupporterPwd);
      setLoggedIn('supporter');
      setinputRegSupporter('');
      setInputRegSupporterPwd('');
      setModal(!showModal);
    }
    // id = 2 = create project
    else if (id === 2) {
      console.log("creating project: ");
      // TODO: LAMBDA FUNCTION CREATE PROJECT
      let msg = {}
      msg["projectName"] = document.getElementById("newProjName").value;
      msg["story"] = document.getElementById("newProjStory").value;
      // msg["designerName"] = document.getElementById("newProjDesigner").value;
      msg["designerName"] = currDesigner;
      msg["type"] = document.getElementById("newProjGenre").value;
      msg["goal"] = document.getElementById("newProjGoal").value;
      msg["deadline"] = document.getElementById("newProjDeadline").value;
      let value = JSON.stringify(msg)
      let data = { 'body': value }

      // post instance
      instancep1.post("/createProject", data)
        .then(function (response) {
          console.log("Successfully created project")
        })
        .catch(function (error) {
          console.log("Error creating project: ", error)
        })
      setModal(!showModal);
    }
    // id = 3 = create pledge
    else if (id === 3) {
      console.log("creating pledge: ");
      // TODO: LAMBDA FUNCTION CREATE PLEDGE
      //const exists = await checkPledgeExists(info.reward, info.amount, info.numMaxSupport, info.projectName, info.supportersName);

      let msg = {}
      msg["reward"] = document.getElementById("newPledgeReward").value;
      msg["amount"] = document.getElementById("newPledgeAmt").value;
      msg["numMaxSupport"] = 10;
      msg["projectName"] = document.getElementById("pjName").value;
      msg["supportersName"] = 'NULL';
      let value = JSON.stringify(msg)
      let data = { 'body': value }

      // post instance
      instancep2.post("/createPledge", data)
        .then(function (response) {
          console.log("Successfully created pledge")
        })
        .catch(function (error) {})
      setModal(!showModal);
    }
    // id = 4 = admin login
    else if (id === 4) {
      
      if(inputLogin ==='admin'){
        console.log("logging in as admin: ", inputLogin, inputPwd);
        setLoggedIn('admin');
      }
      else{
        console.log("logging in as designer: ", inputLogin, inputPwd);
        setLoggedIn('designer');
        setCurrDesigner(inputLogin);
      }
      setInputLogin('');
      setInputPwd('');
      setModal(!showModal);
    }

  };

  // Use Case: Create Project
  const handleCreateProject = e => {
    setModalScreen(2);
    setModal(!showModal);
  }

  // Use Case: List Project
  const handleListProject = id => {
    // id = 0 = designer
    if (id === 0) {
      setDesignerView(1);
      // TODO: LAMBDA FUNCTION LIST PROJECT AS DESIGNER
      let msg = {}
      msg["designerName"] = currDesigner;
      let value = JSON.stringify(msg)
      let data = { 'body': value }
      instancep1.post("/listProject", data)
        .then(function (response) {
          var output_list = response.data.result;
          setdbData(output_list);
        })
        .catch(function (error) { })


    }
    // id = 2 = admin
    else if (id === 2) {
      setAdminView(1);
      // TODO: LAMBDA FUNCTION LIST PROJECT AS ADMIN
      let msg = {}
      let value = JSON.stringify(msg)
      let data = { 'body': value }
      instancep2.post("/listProjects", data)
        .then(function (response) {
          var output_list = response.data.result;
          setdbData(output_list);
        })
        .catch(function (error) { })
    }
  }

  const handleViewProject = name => {
    // Got name of the project in "name"
    setViewProjectName(name);
    // set desginer view to 2
    setDesignerView(2);
    // TODO: LAMBDA FUNCTION VIEW PROJECT
    let msg = {}
    msg["projectName"] = name;
    console.log("View Project: CURR PROJECT = ", name);
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    instancep2.post("/viewProject", data)
      .then(function (response) {
        console.log("View Project: OUTPUT PROJECT = ", response.data.result);
        var output = response.data.result

        document.getElementById("pjName").value = output.project.projectName;
        document.getElementById("pjType").value = output.project.type;
        document.getElementById("pjStory").value = output.project.story;
        document.getElementById("pjDesigner").value = output.project.designerName;
        document.getElementById("pjCurrAmt").value = "0";
        document.getElementById("pjGoalAmt").value = output.project.goal;
        document.getElementById("pjDeadline").value = output.project.deadline;
        setPjPledge(output.pledges);
      })
      .catch(function (error) { })

  }

  const handleCreatePledge = name => {
    console.log("handleCreatePledge: ", name);
    
    setModalScreen(3);
    
    setModal(!showModal);
    // document.getElementById("currProjName").value = name;
  }

  return (

    <div style={layout.sidebar}>
      {/* VISITOR VIEW */}
      {loggedin === 'visitor' && (
        <>
          {/* Project Window */}
          <div>
            <li style={{ height: '750px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}></li>
          </div>
          <div>
            {/* Sidebar */}
            <button type="button" style={layout.button1} onClick={() => showRegModal(0)}> Register as Designer </button>
            <button type="button" style={layout.button2} onClick={() => showRegModal(1)}> Register as Supporter </button>
            <button type="button" style={layout.button3} onClick={() => showRegModal(4)}> Log In</button>
          </div>
        </>
      )
      }
      {/* DESIGNER VIEW */}
      {loggedin === 'designer' && (
        <>
          {/* Project List View */}
          <div>
            {designerView === 1 && (
              <>
                {dbData.filter(project => project.designerName === currDesigner).map(item => (
                  <li key={item.id} ref={refs[item.id]} style={{ height: '120px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}>
                    <div style={layout.projectDetails}>{" Project Name: " + item.projectName}</div>
                    <div style={layout.projectDetails}>{" Story: " + item.story}</div><p></p>
                    <button type="button" onClick={() => handleViewProject(item.projectName)}>View Project</button>
                  </li>
                ))}
              </>
            )
            }
            {/* Default View : No Project */}
            {designerView === 0 && (
              <>
                <li style={{ height: '750px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}></li>
              </>
            )
            }
            {/* Project View */}
            {designerView === 2 && (
              <>
                <li style={{ height: '750px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}>
                  <p></p>
                  Name: <input id="pjName" readOnly /><p></p>
                  Type: <input id="pjType" readOnly /><p></p>
                  Story: <input id="pjStory" readOnly /><p></p>
                  Designer username: <input id="pjDesigner" readOnly /><p></p>
                  Current Amount: <input id="pjCurrAmt" readOnly /><p></p>
                  Goal Amount: <input id="pjGoalAmt" readOnly /><p></p>
                  Deadline: <input id="pjDeadline" readOnly /><p></p>
                  Pledge: <p></p>
                  {pjPledge.map(pledge => (
                      <ul>
                        <div>{"amount: " + pledge.amount + " ; " + pledge.reward}</div>
                      </ul>
                    ))}
                  <button type="button" onClick={(e) => handleCreatePledge(document.getElementById("pjName").value)}>Create Pledge</button><p></p>
                  <button type="button" onClick={(e) => handleViewProject(document.getElementById("pjName").value)}>Refresh</button><p></p>
                  <button type="button" onClick={() => handleListProject(0)}>Back</button>
                </li>
              </>
            )
            }
          </div>
          <div>
            {/* Sidebar */}
            <button type="button" style={layout.button0}> {"Welcome Back! " + currDesigner} </button>
            <button type="button" style={layout.button1} onClick={() => handleCreateProject()}> Create Project </button>
            <button type="button" style={layout.button2} onClick={() => handleListProject(0)}> List Project </button>
          </div>
        </>
      )
      }
      {/* ADMIN VIEW */}
      {loggedin === 'admin' && (
        <>
          {/* Project List View */}
          <div>
            {adminView === 1 && (
              <>
                {dbData.map(item => (
                  <li key={item.id} ref={refs[item.id]} style={{ height: '120px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}>
                    <div style={layout.projectDetails}>{" Project Name: " + item.projectName}</div>
                    <div style={layout.projectDetails}>{" Story: " + item.story}</div>
                  </li>
                ))}
              </>
            )
            }
            {/* Default View : No Project */}
            {adminView === 0 && (
              <>
                <li style={{ height: '750px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}></li>
              </>
            )
            }
          </div>
          <div>
            {/* Sidebar */}
            <button type="button" style={layout.button0}> {"Welcome Back! " + loggedin} </button>
            <button type="button" style={layout.button1} onClick={() => handleListProject(2)}> List Project </button>
            <button type="button" style={layout.button2}> Delete Project </button>
          </div>
        </>
      )
      }



      <Modal onClose={showRegModal} show={showModal}>
        {modalScreen === 0 && (
          <>
            <h2>Register Designer</h2>
            <form>
              <ul>
                <li> <label>Username: <input type="text" value={inputRegDesigner} onChange={e => setinputRegDesigner(e.target.value)} />        </label></li>
                <li> <label>Email: <input type="text" value={inputRegDesignerPwd} onChange={e => setInputRegDesignerPwd(e.target.value)} />        </label></li>
              </ul>
              <input type="button" value="Submit" onClick={() => handleRegister(0)} />
              {/* <button type='button' onClick={() => handleRegister(1)}>submit</button> */}
            </form>
          </>
        )}
        {modalScreen === 1 && (
          <>
            <h2>Register Supporter</h2>
            <form>
              <ul>
                <li> <label>Email: <input type="text" value={inputRegSupporter} onChange={e => setinputRegSupporter(e.target.value)} />        </label></li>
                <li> <label>Password: <input type="password" value={inputRegSupporterPwd} onChange={e => setInputRegSupporterPwd(e.target.value)} />        </label></li>
              </ul>
              <input type="button" value="Submit" onClick={() => handleRegister(1)} />
            </form>
          </>
        )}
        {modalScreen === 2 && (
          <>
            <h2>Create Project</h2>
            <form>
              <ul>
                <li> <label>Project Name: <input type="text" id='newProjName' />            </label></li>
                <li> <label>Story: <input type="text" id='newProjStory' />            </label></li>
                <li> <label>Designer Name: <input type="text" id='newProjDesigner' />            </label></li>
                <li> <label>Genre: <input type="text" id='newProjGenre' />            </label></li>
                <li> <label>Goal: <input type="text" id='newProjGoal' />            </label></li>
                <li> <label>Deadline YYYY-MM-DD:<input type="text" id='newProjDeadline' />            </label></li>
              </ul>
              <input type="button" value="Submit" onClick={() => handleRegister(2)} />
            </form>
          </>
        )}
        {modalScreen === 3 && (
          <>
            <h2>Create Pledge</h2>
            <form>
              <ul>
                <li> <label>Amount: <input type="text" id='newPledgeAmt' />            </label></li>
                <li> <label>Description: <input type="text" id='newPledgeReward' />            </label></li>
              </ul>
              <input type="button" value="Submit" onClick={() => handleRegister(3)} />
            </form>
          </>
        )}
        {modalScreen === 4 && (
          <>
            <h2>Log In </h2>
            <p>Hint for Admins: Enter admin for both fields</p>
            <form>
              <ul>
                <li> <label>Username: <input type="text" value={inputLogin} onChange={e => setInputLogin(e.target.value)} />        </label></li>
                <li> <label>Email: <input type="text" value={inputPwd} onChange={e => setInputPwd(e.target.value)} />        </label></li>
              </ul>
              <input type="button" value="Submit" onClick={() => handleRegister(4)} />
            </form>
          </>
        )}


      </Modal>

    </div>

  );
}


export default App;