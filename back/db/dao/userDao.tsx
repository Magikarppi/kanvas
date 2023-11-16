
const { Pool, Client } = require('pg');
const { insertNewUser, deleteUser, updateUser, getUserById, getUserByEmail } = require('./userQueries.tsx')

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone_number: string;
  country: string;
  city: string;
  picture: string;
  account_creation_date: Date;
  is_online: boolean;
  last_online: Date;
  is_open_to_work: boolean;
  linkedin_username: string;
  job_pitch: string;
};

interface DAO<T> {
  createNewUser(item: T): void;
  getUserById(id: string): Promise<T | null>;
  getUserByEmail(email: string): Promise<T | null>;
  update(id: string, user: T): void;
  delete(id: string): void;
}
  
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
  
  const userDAO: DAO<IUser> = {
    createNewUser: (user: IUser) => {
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
        return result.rows[0] as IUser | null;
      }
      finally{
        databaseConnection.disconnect();
      }
    },

    getUserByEmail: async(email: string) => {
      try {
        databaseConnection.connect();
        const result = await client.query(getUserByEmail, [email])
        return result.rows[0] as IUser | null;
      }
      finally{
        databaseConnection.disconnect();
      }
    },
    update: (id:string, user: IUser ) => {
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
  
 