
export const insertNewUser =  `
        INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        phone_number,
        country,
        city,
        picture,
        account_creation_date,
        is_online,
        last_online,
        is_open_to_work,
        linkedin_username,
        job_pitch
        ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        )`;

export const deleteUser = "DELETE FROM users WHERE id = $1";

export const updateUser = `
    UPDATE users 
    SET 
      first_name = $1,
      last_name = $2,
      email = $3,
      password_hash = $4,
      phone_number = $5,
      country = $6,
      city = $7,
      picture = $8,
      account_creation_date = $9,
      is_online = $10,
      last_online = $11,
      is_open_to_work = $12,
      linkedin_username = $13,
      job_pitch = $14
    WHERE id = $15`;

export const getUserById = 'SELECT * FROM users WHERE id = $1';

export const getUserByEmail = 'SELECT * FROM users WHERE email = $1';