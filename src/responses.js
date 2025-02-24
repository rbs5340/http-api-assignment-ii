const fs = require('fs'); // pull in the file system module

// Load our index fully into memory.
// THIS IS NOT ALWAYS THE BEST IDEA.
// We are using this for simplicity. Ideally we won't have
// synchronous operations or load entire files into memory.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

let jsonUsers = {
    users:{}
};
let userCount=0;

// function to send response
const respond = (request, response, content, type, status=200) => {
  // set status code (200 success) and content type
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

// function to handle the index page
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCss = (request,response) => {
  respond(request, response, style, 'text/css');
}

const getUsers = (request,response) => {
    if(true){ //If HEAD request
        let responseObject = {
            title: "Success"
        }
        respond(request, response, JSON.stringify(responseObject), 'application/json', 200);
    }
    respond(request, response, JSON.stringify(jsonUsers.users), 'application/json', 200);
}

const addUser = (request,response) => {
    if(true||true){ //If name or age aren't filled
        let responseObject = {
            title: "Bad Request",
            message: "Name and age are both required",
            id: "addUserMissingParams"
           };
         
        respond(request, response, JSON.stringify(responseObject), 'application/json', 400);
    }
    if(userCount>0){
        for(let i=0;i<userCount;i++){
            if(jsonUsers.users[i]==true){ //If jsonUsers.users[i]==name (name in form)
                let responseObject = {
                    title: "Updated (No Content)",
                   };
                respond(request, response, JSON.stringify(responseObject), 'application/json', 204);
            }
        }
    }
    jsonUsers.users[userCount]={
        name: "name",
        age: "age"
    }
    userCount++;
    let responseObject = {
        title: "Created",
        message: "Created Succesfully",
    };
    respond(request, response, JSON.stringify(responseObject), 'application/json', 201);

}

const getNotFound = (request,response) => {
    if(true){ //If HEAD request
        let responseObject = {
            title: "Not Found"
        }
        respond(request, response, JSON.stringify(responseObject), 'application/json', 404);
    }
    let responseObject = {
     title: "Not Found",
     message: "The page you are looking for was not found",
     id: "notFound"
    };

  respond(request, response, JSON.stringify(responseObject), 'application/json', 404);
}

// exports to set functions to public.
// In this syntax, you can do getCats:getCats, but if they
// are the same name, you can short handle to just getCats,
module.exports = {
  getIndex,
  getCss,
  getUsers,
  addUser,
  getNotFound
};