//Database connection import
import { pool } from "../../config/connection.js";

//Returns a Promise containing all room in specified room id
export const roomById = async (id) => {
    const results = await pool.query(`
    SELECT * FROM room
    WHERE id = ${id};
    `);
    return results.rows;
}
//Returns a Promise containing all room in specified hotels id
export const allRoom = async (id) => {
    const results = await pool.query(`
    SELECT * FROM room
    WHERE id_hotel = ${id};
    `);
    return results.rows;
}

//Returns a Promise containing all room in specified periode
export const allRoomAvailaible = async (start, end) => {
    const results = await pool.query(`
    SELECT room.*
    FROM (
        SELECT *FROM reservation
            WHERE  '${start}'<=start_time AND start_time<='${end}'
        UNION
        SELECT * FROM reservation
            WHERE  '${start}'<=end_time AND end_time<='${end}'
    ) as indisponibility
        RIGHT JOIN room
        ON room.id = indisponibility.room_id
        WHERE indisponibility.room_id IS NULL;
    `);
    return results.rows;
}

// insert
export const insertRoom = async (room_type, hotel) => {
    const result = await pool.query(`
    INSERT INTO room (id_room_type, id_hotel)
    VALUES (
        '${room_type}',
        '${hotel}'
    )
    `);
    return results.rows
}