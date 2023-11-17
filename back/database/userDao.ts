import { insertNewUser, deleteUser, updateUser, getUserById, getUserByEmail } from "./userQueries";
import { IUser} from "./interfaces";
import { executeQuery } from "./database-service";


export const  createNewUserDAO = (user: IUser) => {
    const values = Object.values(user);
    executeQuery(insertNewUser, values);
};

export const getUserDAO = async(id: string) => {
    const result = await executeQuery(getUserById, [id]);
    if(result){
        return result.rows[0] as IUser | null;
    }
};

export const getUserEmailDAO = async(email: string) => {
    const result = await executeQuery(getUserByEmail, [email]);
    if(result){
        return result.rows[0] as IUser | null;
    }
};

export const updateDAO = (id: string, user: IUser) => {
    const copyUser: IUser = { ...user }; 
    const values = Object.values(copyUser);
    const shiftArray: (string | boolean | Date | null | undefined)[] = values.slice(1); 
    shiftArray.push(id);
    executeQuery(updateUser, shiftArray);
};

export const deleteUserDAO = (id: string) => {
    executeQuery(deleteUser, [id]);
};
  
 