


const { insertNewUser, deleteUser, updateUser, getUserById, getUserByEmail } = require('./userQueries.ts');
const { IUser, DAO } = require('./interfaces.ts');
const { executeQuery } = require('./database-service.ts');

const userDAO: typeof DAO = {
  createNewUser: (user: typeof IUser) => {
    const values = Object.values(user);
    executeQuery(insertNewUser, values)
    return user;
  },
  getUserById: async(id: string) => {
      const result = await executeQuery(getUserById, [id])
      return result.rows[0] as typeof DAO | null;
    
  },

  getUserByEmail: async(email: string) => {
    try {
      const result = await executeQuery(getUserByEmail, [email])
      return result.rows[0] as typeof IUser | null;
    }
    finally{
    }
  },
  update: (id:string, user: typeof IUser ) => {
    let copyUser:any = user;
    delete copyUser.id;
    const values = Object.values(copyUser);
    values.push(id);
    executeQuery(updateUser, values);
  },
  delete: (id: string) => {
    executeQuery(deleteUser, [id]);
  },
};

export default userDAO;
  
 