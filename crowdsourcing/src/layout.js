export const layout = {
    canvasPos : {
        position: "absolute",
        left: 650,
        top: 150,
      },

    sidebar : {
        position: "relative",
        display: "grid", 
        gridTemplateColumns: "4fr 1fr", 
        gridGap: 80, 
        padding:100, 
    },

    button1: {
        position: "absolute",
        top: 100,
        width: 200,
        height: 50,
    },
    
    button2: {
        position: "absolute",
        top: 170,
        width: 200,
        height: 50,
    },

    button3: {
        position: "absolute",
        top: 240,
        width: 200,
        height: 50,
    },

    projectDetails:{
        paddingTop: 10,
        paddingLeft: 10,
    },

    Appmain : {
      backgroundColor: "#320453",
      height: "100vh",
      width: "100vw",
    },

    projectCanvas : {
        backgroundColor: "#E34234",
        paddingTop: 100,
        paddingLeft: 15,
        paddingRight: 15,
        height: "20vh",
        width: "20vw",
    },

    text: { 
        position: "absolute",
        left:500,
        top:50,
        color:"yellow",
        backgroundColor: "#320453",
        width:150,
      },
    
    stuck: { 
        position: "absolute",
        left: 800,
        top:50,
        backgroundColor: "#E34234",
        color: "white",
        textAlign: "center",
        width:200,
        paddingTop: 15,
        height: 35,
      },

    buttons: { 
        position: "absolute",
        left: 550,
        top:90
      },

      upbutton:  {
        position: "absolute",
        right: 550,
        top: 250,
        width: 50,
        height: 50,
      },
      
      downbutton : {
        position: "absolute",
        right: 550,
        top: 350,
        width: 50,
        height: 50,
      },
      
      leftbutton : {
        position: "absolute",
        right: 600,
        top: 300,
        width: 50,
        height: 50,
      },
      
      rightbutton : {
        position: "absolute",
        right: 500,
        top: 300,
        width: 50,
        height: 50,
      },

      levelDropdown: {
        position: "absolute",
        left: 450,
        top: 250,
        width: 150,
        height: 50,
      },

      resetLevelButton: {
        position: "absolute",
        left: 450,
        bottom: 345,
        width: 150,
        height: 50,
      },

      moveButton: {
        position: "absolute",
        right: 500,
        bottom: 430,
        width: 150,
        height: 50,
      },

      pickKeyButton: {
        position: "absolute",
        right: 500,
        bottom: 345,
        width: 150,
        height: 50,
      },

      moveCounter: {
        // position: "absolute",
        // right: 475,
        // top: 160,
        width: 200,
        height: 100, 
        backgroundColor: "#a349a4",
        color: "white",
        textAlign: "center",
        paddingTop: 15,
        fontFamily: "verdana",
      },

      levelDisplay: {
        position: "absolute",
        left: 425,
        top: 160,
        width: 200,
        height: 50, 
        backgroundColor: "#a349a4",
        color: "white",
        textAlign: "center",
        fontFamily: "verdana",
      },

      keyDisplay: {
        position: "absolute",
        left: 425,
        top: 220,
        width: 195,
        height: 35,
        paddingTop: 15, 
        borderColor: "#a349a4",
        border: "medium solid #a349a4",
        color: "#a349a4",
        textAlign: "center",
        fontFamily: "verdana",
        fontSize: "120%",
        fontWeight: "700",
      }

}