//For secure connection:
const { Pool } = require("pg");

const accountSid = "AC7cccd3baa0c7d82b7da6ceab7fc04335";
const authToken = "3b4e52d8e2c3d30bfbd5534f17e19c9a";
const client = require('twilio')(accountSid, authToken);

// Configure the database connection.

const config = {
  user: "adarsha",
  password: "IjKPYhrP9s_K5L4s",
  host: "free-tier6.gcp-asia-southeast1.cockroachlabs.cloud",
  database: "sharkhacks-1386.defaultdb",
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
      response.redirect("/add-targets")
    })
    )}

    const sendsms = (request, response) => {
      
      client.messages
        .create({
           body: 'Thanks for joining Blahaj!!!',
           from: '+14123764341',
           mediaUrl: ['https://blahajgang.lol/assets/just-blahaj.png'],
           to: '+91745654409'
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
        pool.query('INSERT INTO targets (name, email, phoneno) VALUES ($1, $2, $3)', [name, email, phoneno], (error, results) => {
          if (error) {
            throw error
          }
          response.redirect("/add-targets")
        })
        )}

module.exports = {
create,
view,
sendsms,
signup
  }
