export const insertTeam = `
        INSERT INTO teams (
        id,
        name,
        admin,
        is_public
        ) VALUES (
        $1, $2, $3, $4
        )`;

export const deleteTeam = "DELETE FROM teams WHERE id = $1";

export const getUserTeams =
    "SELECT teams.* FROM teams INNER JOIN user_teams ON teams.id = user_teams.team_id INNER JOIN users ON user_teams.user_id = users.id WHERE users.id = $1;";

export const updateTeam = `
        UPDATE teams 
        SET 
        name = $1,
      is_public = $2
    WHERE id = $3`;

export const getTeamById = "SELECT * FROM teams WHERE id = $1";

export const insertUsersTeamLink =
    "INSERT INTO user_teams (id,user_id,team_id) VALUES ($1, $2, $3)";

export const deleteUserTeamLink = "DELETE FROM user_teams WHERE team_id = $1";
