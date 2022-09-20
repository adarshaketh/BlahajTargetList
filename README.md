# 🦈🦈Blahaj Gang Target List💪🦈
A target list app made using Node.js+ CockroachDB and useful for Blahaj warriors

# ✔️Requirements:

A Computer/Server with node.js installed. You can install it from https://nodejs.org/en/download/
An account on Twilio and CockroachDB database.
Install Nde.js and NPM in ubuntu
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
npm install nodemon
npm install twilio
```

# 🤔How to Deploy?
1.First clone this repository using command
```
git clone https://github.com/adarsha2003/BlahajTargetList
```
*OR you can also fork this reposiroty
2. Update conn.js file in /src/db/conn.js, with your database connection details and twilio API key
4. (Optional) You can change port to run this app, by editing /src/app.js (By default this app is running in port 3000)
5. Go to root directory of this project then run these commands to install dependencies
```
cd BlahajTargetList
npm install
```
5. Run this command in terminal to start the node.js server
```
npm run shark
```
6. Go to http://localhost:3000 to view application
## Inspiration
Its just made to help Blahaj Gang members to build Higher Targets and to manage those.
## What it does
This WEB Application can be used to list the Higher targets to be achieved by members of Blahaj Gang.
## How I built it
I hosted this web application on Kali linux. I have build an API which runs SQL commands to manage database. I have used Express.js during the creation of API. I used Datatables to display list of Targets and Members stored in database in form of table. For Frontend I have used Bootstrap. I have integrated Twilio API to send Special Gift to Members via SMS 📧.
## Challenges I ran into
Due to lack of time i couldn't concentrate more on Website UI.
## What I learned
Creating an API in node.js. Usage of express.js in node.js. Integrating Twilio API and CockroachDB to node.js project.
## What's next for 🦈🦈Blahaj Gang Target List💪🦈
I am thinking to add delete, edit feature for Targets and members. Also i am thinking to add Admin Panel to manage Users more easily and secure way. 
