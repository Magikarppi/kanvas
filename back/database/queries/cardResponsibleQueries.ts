export const allcardResponsiblePersons = "SELECT users.id AS user_id, first_name, last_name, email, picture, card_responsible_persons.id AS card_responsible_id FROM users INNER JOIN card_responsible_persons ON users.id = card_responsible_persons.user_id WHERE card_responsible_persons.card_id = $1";
export const cardResponsiblePersonData = "SELECT * from card_responsible_persons WHERE id = $1";
export const addCardResponsiblePerson = "INSERT INTO card_responsible_persons (id, user_id, card_id) VALUES ($1, $2, $3);";
export const deleteCardResponsiblePerson = "DELETE FROM card_responsible_persons WHERE id = $1;";