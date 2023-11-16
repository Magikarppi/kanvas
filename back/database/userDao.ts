


const { insertNewUser, deleteUser, updateUser, getUserById, getUserByEmail } = require('./userQueries.ts');
const { IUser, DAO } = require('./interfaces.ts');
const { executeQuery } = require('./database-service.ts');


export const  createNewUserDAO = (user: typeof IUser) => {
    const values = Object.values(user);
    executeQuery(insertNewUser, values)
};

export const getUserDAO = async(id: string) => {
  const result = await executeQuery(getUserById, [id])
  return result.rows[0] as typeof IUser | null;
};

export const getUserEmailDAO = async(email: string) => {
      const result = await executeQuery(getUserByEmail, [email])
      return result.rows[0] as typeof IUser | null;
};

export const updateDAO = (id:string, user: typeof IUser ) => {
    let copyUser:any = user;
    delete copyUser.id;
    const values = Object.values(copyUser);
    values.push(id);
    executeQuery(updateUser, values);
};

export const deleteUserDAO = (id: string) => {
  executeQuery(deleteUser, [id]);
}
  
 