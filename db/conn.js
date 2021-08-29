//For secure connection:
const { Pool } = require("pg");

const accountSid = "your_accountSid";
const authToken = "your_auth_token";
const client = require('twilio')(accountSid, authToken);

// Configure the database connection.

const config = {
  user: "db_username",
  password: "db_password",
  host: "db_hostname",
  database: "db_name",
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
  //For secure connection:
  /*ssl: {
        ca: fs.readFileSync('/certs/ca.crt')
            .toString()
    }*/
};


const pool = new Pool(config);

const view = (request, response) => {
    pool.query('CREATE TABLE IF NOT EXISTS targets (id STRING NOT NULL, title STRING NOT NULL, description STRING NOT NULL, CONSTRAINT "primary" PRIMARY KEY (id ASC, title ASC))',  (error, results) => {
     if (error) {
      throw error
    }
    console.log(`Created targets table if it does not exist`)},
    pool.query('SELECT * FROM targets', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  )}

  const create = (request, response) => {
    const { id, title, description } = request.body
    pool.query('CREATE TABLE IF NOT EXISTS members (id STRING NOT NULL, title STRING NOT NULL, description STRING NOT NULL, CONSTRAINT "primary" PRIMARY KEY (id ASC))',  (error, results) => {
      if (error) {
        throw error
      }
      console.log(`Created targets table if it does not exist`)},
    pool.query('INSERT INTO targets (id, title, description) VALUES ($1, $2, $3)', [id, title, description], (error, results) => {
      if (error) {
        throw error
      }
      response.redirect("/our-targets")
    })
    )}

    const sendsms = (request, response) => {
      client.messages
        .create({
           body: 'Hi +14704654369. Thanks for joining Blahaj!!! You can buy your Blahaj from https://www.ikea.com/sg/en/p/blahaj-soft-toy-shark-10373589/',
           from: '+14123764341',
           mediaUrl: ['https://blahajgang.lol/assets/just-blahaj.png'],
           to: "you_mobile_no"
         })
        .then(message => console.log(message.sid)); 
      }

      const signup = (request, response) => {
        const { name, email, phoneno } = request.body
        pool.query('CREATE TABLE IF NOT EXISTS members (name STRING NOT NULL, email STRING NOT NULL, phoneno STRING NOT NULL, CONSTRAINT "primary" PRIMARY KEY (email ASC))',  (error, results) => {
          if (error) {
            throw error
          }
          console.log(`Created members table if it does not exist`)},
        pool.query('INSERT INTO members (name, email, phoneno) VALUES ($1, $2, $3)', [name, email, phoneno], (error, results) => {
          if (error) {
            throw error
          }
          response.redirect("/members")
        })
        )}
        const viewmem = (request, response) => {
          pool.query('CREATE TABLE IF NOT EXISTS members (id STRING NOT NULL, title STRING NOT NULL, description STRING NOT NULL, CONSTRAINT "primary" PRIMARY KEY (id ASC, title ASC))',  (error, results) => {
           if (error) {
            throw error
          }
          console.log(`Created targets table if it does not exist`)},
          pool.query('SELECT * FROM members', (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
          })
        )}

module.exports = {
create,
view,
sendsms,
signup,
viewmem
  }
