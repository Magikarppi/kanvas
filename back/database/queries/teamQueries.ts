
export const insertNewTeam =  `
        INSERT INTO teams (
        id,
        name,
        admin,
        is_public
        ) VALUES (
        $1, $2, $3, $4
        )`;
export const deleteTeam = "DELETE FROM teams WHERE id = $1";

export const updateTeam = `
    UPDATE teams 
    SET 
      name = $1,
      is_public = $2
    WHERE id = $3`;

export const getTeamById = "SELECT * FROM teams WHERE id = $1";

export const insertTeamUsersTeam = "INSERT INTO user_teams (id,user_id,team_id) VALUES ($1, $2, $3)";
