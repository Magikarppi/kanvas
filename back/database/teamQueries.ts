
export const insertNewTeam =  `
        INSERT INTO teams (
        id,
        name,
        admin,
        is_public,
        ) VALUES (
        $1, $2, $3, $4
        )`;

export const deleteTeam = "DELETE FROM teams WHERE id = $1";

export const updateTeam = `
    UPDATE teams 
    SET 
      name = $1,
      admin = $2,
      is_public = $3,
    WHERE id = $4`;

export const getTeamById = "SELECT * FROM teams WHERE id = $1";
