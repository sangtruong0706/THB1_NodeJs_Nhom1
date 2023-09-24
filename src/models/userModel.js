import pool from './../config/connectDB'
const getAllUser = async ()=> {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return rows
}
const DetailUser = async (id_user)=> {
    const [rows, fields] = await pool.execute('SELECT * FROM `users` where `id_user` =?', [id_user])
    return rows[0]
}


export default {getAllUser, DetailUser}