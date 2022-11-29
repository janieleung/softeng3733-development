import React from 'react';
import { layout } from './layout.js';
import Modal from "./Component/Modal";

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

function App() {
  const refs = list.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});


  // 0: Register designer, 1: Register Supporter, 2: Create Project, 3: Create Pledge, 4: Admin LogIn
  const [modalScreen, setModalScreen] = React.useState(0);  
  const [showModal, setModal] = React.useState(false);  // true: show modal, false: hide modal


  const [loggedin, setLoggedIn] = React.useState('visitor');  // designer, supporter, admin, visitor

  // designer states
  const [inputRegDesigner, setinputRegDesigner] = React.useState('');
  const [inputRegDesignerPwd, setInputRegDesignerPwd] = React.useState('');
  const [designerView, setDesignerView] = React.useState(0);    // 0 : no project, 1: brief project, 2: project view
  const [currDesigner, setCurrDesigner] = React.useState('George H'); // TODO: Identify designer 
  const [viewProjectID, setViewProjectID] = React.useState(0);      // View project based on the id of the project

  const [projName, setProjName] = React.useState('');
  const [projStory, setProjStory] = React.useState('');
  const [projDesigner, setProjDesigner] = React.useState('');
  const [projGenre, setProjGenre] = React.useState('');
  const [projGoal, setProjGoal] = React.useState('');
  const [projDeadline, setProjDeadline] = React.useState('');

  const [pledgeAmt, setPledgeAmt] = React.useState(0);
  const [pledgeDes, setPledgeDes] = React.useState('');

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


  // Use Case: Register Designer
  const handleRegister = id => {
    // id = 0 = designer
    if (id === 0) {
      console.log("registering designer: ", inputRegDesigner, inputRegDesignerPwd);
      // TODO: LAMBDA FUNCTION REGISTER DESIGNER
      setLoggedIn('designer');
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
      console.log("creating project: ", projName, projStory, projDesigner, projGenre, projGoal, projDeadline);
      // TODO: LAMBDA FUNCTION CREATE PROJECT
      setProjName('');
      setProjStory('');
      setProjDesigner('');
      setProjGenre('');
      setProjGoal('');
      setProjDeadline('');
      setModal(!showModal);
    }
    // id = 3 = create pledge
    else if(id === 3){
      console.log("creating pledge: ", pledgeAmt, pledgeDes);
      // TODO: LAMBDA FUNCTION CREATE PLEDGE
      setPledgeAmt(0);
      setPledgeDes('');
      setModal(!showModal);
    }
    // id = 4 = admin login
    else if(id === 4){
      console.log("logging in as admin: ", inputLogin, inputPwd);
      setLoggedIn('admin');
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
    if(id === 0){
      setDesignerView(1);
      // TODO: LAMBDA FUNCTION LIST PROJECT AS DESIGNER
    }
    // id = 2 = admin
    else if(id === 2){
      setAdminView(1);
      // TODO: LAMBDA FUNCTION LIST PROJECT AS ADMIN
    }
  }

  const handleViewProject = id => {
    // set projectstateid
    setViewProjectID(id);
    // set desginer view to 2
    setDesignerView(2);
    // TODO: LAMBDA FUNCTION VIEW PROJECT
  }

  const handleCreatePledge = e => {
    setModalScreen(3);
    setModal(!showModal);
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
            <button type="button" style={layout.button3} onClick={() => showRegModal(4)}> I am admin </button>
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
                {list.filter(project => project.designer === currDesigner).map(item => (
                  <li key={item.id} ref={refs[item.id]} style={{ height: '300px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}>
                    <div style={layout.projectDetails}>{" Project ID: " + item.id}</div>
                    <div style={layout.projectDetails}>{" Project Name: " + item.name}</div>
                    <div style={layout.projectDetails}>{" Story: " + item.story}</div>
                    <button type="button" onClick={() => handleViewProject(item.id)}>View Project</button>
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
                {list.filter(project => project.id === viewProjectID).map(chosenProject => (
                  <li key={chosenProject.id} ref={refs[chosenProject.id]} style={{ height: '750px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}>
                    <div style={layout.projectDetails}>{" Project ID: " + chosenProject.id}</div>
                    <div style={layout.projectDetails}>{" Project Name: " + chosenProject.name}</div>
                    <div style={layout.projectDetails}>{" Type: " + chosenProject.type}</div>
                    <div style={layout.projectDetails}>{" Story: " + chosenProject.story}</div>
                    <div style={layout.projectDetails}>{" Designer: " + chosenProject.designer}</div>
                    <div style={layout.projectDetails}>{" Current Amount: " + chosenProject.currentAmt}</div>
                    <div style={layout.projectDetails}>{" Goal Amount: " + chosenProject.goalAmt}</div>
                    <div style={layout.projectDetails}>{" Deadline: " + chosenProject.deadline}</div>
                    <div style={layout.projectDetails}>Current Pledges:</div>
                    {chosenProject.pledges.map(pledge => (
                      <ul>
                        <div>{"amount: " + pledge.amount + " ; " + pledge.description}</div>
                      </ul>
                    ))}
                    <button type="button" onClick={(e) => handleCreatePledge()}>Create Pledge</button>
                    <button type="button" onClick={() => handleListProject(0)}>Back</button>
                  </li>
                ))}
              </>
            )
            }
          </div>
          <div>
            {/* Sidebar */}
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
                {list.map(item => (
                  <li key={item.id} ref={refs[item.id]} style={{ height: '300px', width: '800px', border: '1px solid black', backgroundColor: '	#f4cccc' }}>
                    <div style={layout.projectDetails}>{" Project ID: " + item.id}</div>
                    <div style={layout.projectDetails}>{" Project Name: " + item.name}</div>
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
                <li> <label>Email: <input type="text" value={inputRegDesigner} onChange={e => setinputRegDesigner(e.target.value)} />        </label></li>
                <li> <label>Password: <input type="password" value={inputRegDesignerPwd} onChange={e => setInputRegDesignerPwd(e.target.value)} />        </label></li>
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
                <li> <label>Project Name: <input type="text" value={projName} onChange={e => setProjName(e.target.value)} />            </label></li>
                <li> <label>Story: <input type="text" value={projStory} onChange={e => setProjStory(e.target.value)} />                 </label></li>
                <li> <label>Designer Name: <input type="text" value={projDesigner} onChange={e => setProjDesigner(e.target.value)} />   </label></li>
                <li> <label>Genre: <input type="text" value={projGenre} onChange={e => setProjGenre(e.target.value)} />                 </label></li>
                <li> <label>Goal: <input type="number" value={projGoal} onChange={e => setProjGoal(e.target.value)} />                  </label></li>
                <li> <label>Deadline: <input type="date" value={projDeadline} onChange={e => setProjDeadline(e.target.value)} />        </label></li>
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
                <li> <label>Amount: <input type="number" value={pledgeAmt} onChange={e => setPledgeAmt(e.target.value)} />            </label></li>
                <li> <label>Description: <input type="text" value={pledgeDes} onChange={e => setPledgeDes(e.target.value)} />                 </label></li>
              </ul>
              <input type="button" value="Submit" onClick={() => handleRegister(3)} />
            </form>
          </>
        )}
        {modalScreen === 4 && (
          <>
            <h2>Enter Admin Credentials</h2>
            <form>
              <ul>
                <li> <label>Email: <input type="text" value={inputLogin} onChange={e => setInputLogin(e.target.value)} />        </label></li>
                <li> <label>Password: <input type="password" value={inputPwd} onChange={e => setInputPwd(e.target.value)} />        </label></li>
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