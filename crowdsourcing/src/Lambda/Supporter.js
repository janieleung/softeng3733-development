import axios from "axios";

const instancep1 = axios.create({
    // baseURL: 'https://sakv15k9hl.execute-api.us-east-1.amazonaws.com/Prod/'
    baseURL: 'https://0um29suci6.execute-api.us-east-1.amazonaws.com/Prod'
});

const instancep2 = axios.create({
    baseURL: 'https://nxs9op302e.execute-api.us-east-1.amazonaws.com/Prod'
});

const instancep3 = axios.create({
    baseURL: 'https://snaj1zrued.execute-api.us-east-1.amazonaws.com/Prod'
});

export function registerSupporter(name, email) {
    console.log("Registering supporter... Name: ", name, ", Email:",  email);
    let msg = {}
    msg["name"] = name;
    msg["email"] = email;
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep1.post("/registerSupporter", data);
}

export function searchProject(type){
    console.log("Searching Project... Type:", type);
    let msg = {}
    msg["type"] = type;
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep2.post("/searchProjects", data);
}

export function viewProjectAsSupporter(name){
    console.log("Viewing Project as Supporter... Name:", name);
    let msg = {}
    msg["projectName"] = name;
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep2.post("/viewProjectSupporter", data);

}

export function viewPledge(pledgeid, projectName){
    console.log("Viewing Pledge... ID: ", pledgeid, ", projectName ", projectName);
    let msg = {}
    msg["pledgeID"] = pledgeid;
    msg["projectName"] = projectName;
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep2.post("/viewPledge", data);

}

export function claimPledge(pledgeid, supporterName, supporterEmail, projectName){
    console.log("Claiming Pledge... ID:", pledgeid, ", Supporter: ", supporterName, ", Supporter email: ", supporterEmail, ", Project Name: ", projectName);
    let msg = {}
    msg["pledgeID"] = pledgeid;
    msg["supporterName"] = supporterName;
    msg["supporterEmail"] = supporterEmail;
    msg["projectName"] = projectName
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep3.post("/hello-world", data);

}

export function addFund(name, email, fund){
    console.log("Adding fund to account: amount: ", fund, ', name: ', name, ', email: ', email)
    let msg = {}
    msg["supporterName"] = name;
    msg["supporterEmail"] = email;
    msg["fund"] = fund
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep2.post("/addFunds", data);
}

export function directSupport(name, email, fund, projectName){
    console.log("Direct Support: amount: ", fund, ', name: ', name, ', email: ', email, ', project: ', projectName)
    let msg = {}
    msg["supporterName"] = name;
    msg["supporterEmail"] = email;
    msg["projectName"] = projectName;
    msg["fund"] = fund
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep2.post("/giveDirectSupport", data);
}

export function reviewSupporterActivity(name, email){
    console.log("Viewing Activity of Supporter: ", name, ", Email: ", email)
    let msg = {}
    msg["supporterName"] = name;
    msg["supporterEmail"] = email;
    let value = JSON.stringify(msg)
    let data = { 'body': value }

    return instancep2.post("/reviewSupporterActivity", data);
}