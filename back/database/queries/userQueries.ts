export const insertNewUser = `
        INSERT INTO users (
        id,
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
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        )`;

export const deleteUser = "DELETE FROM users WHERE id = $1";

export const updateUser = `
    UPDATE users 
    SET 
      first_name = $1,
      last_name = $2,
      email = $3,
      phone_number = $4,
      country = $5,
      city = $6,
      picture = $7,
      is_online = $8,
      last_online = $9,
      is_open_to_work = $10,
      linkedin_username = $11,
      job_pitch = $12
    WHERE id = $13`;

export const updatePassword = "UPDATE users SET password_hash = $2 WHERE id = $1";

export const getUserById = "SELECT * FROM users WHERE id = $1";

export const getUserByEmail = "SELECT * FROM users WHERE LOWER(email) = LOWER($1)";
