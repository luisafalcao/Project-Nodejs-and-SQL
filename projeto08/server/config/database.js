import pg from "pg";

export default async function Query(text, value = undefined) {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL
    })
    try {
        await client.connect();
        const resultado = await client.query(text, value);
        return resultado.rows;
    } catch (err) {
        console.error('Database query error', err);
        throw err;
    } finally {
        await client.end();
    }
}