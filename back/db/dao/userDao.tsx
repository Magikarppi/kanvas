


const { Pool, Client } = require('pg');
const { insertNewUser, deleteUser, updateUser, getUserById, getUserByEmail } = require('./userQueries.tsx');
const {IUser, DAO} = require('./userInterfaces');

const config = {
  user: process.env.USER_NAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PORT,  
};
const pool = new Pool(config);
const client = new Client(config);
const databaseConnection = {
  connect: () => {
    pool.connect((err:string) => {
        if (err) {
          return console.error('Virhe yhteyden avaamisessa', err);
        }
    });
  },
  disconnect: () => {
    pool.end();
  },
};

  const userDAO: typeof DAO = {
    createNewUser: (user: typeof IUser) => {
      databaseConnection.connect();
      const values = Object.values(user);
      client.query(insertNewUser, values)
      databaseConnection.disconnect();
      return user;
    },
    getUserById: async(id: string) => {
      try {
        databaseConnection.connect();
        const result = await client.query(getUserById, [id])
        return result.rows[0] as typeof DAO | null;
      }
      finally{
        databaseConnection.disconnect();
      }
    },

    getUserByEmail: async(email: string) => {
      try {
        databaseConnection.connect();
        const result = await client.query(getUserByEmail, [email])
        return result.rows[0] as typeof IUser | null;
      }
      finally{
        databaseConnection.disconnect();
      }
    },
    update: (id:string, user: typeof IUser ) => {
      databaseConnection.connect();
      let copyUser:any = user;
      delete copyUser.id;
      const values = Object.values(copyUser);
      values.push(id);
      client.query(updateUser, values);
      databaseConnection.disconnect();
    },
    delete: (id: string) => {
      databaseConnection.connect();
      client.query(deleteUser, [id]);
      databaseConnection.disconnect();
    },
  };

export default userDAO;
  
 