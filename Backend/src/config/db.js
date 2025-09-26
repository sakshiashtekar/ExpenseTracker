// Import the Neon client for serverless PostgreSQL
import { neon } from "@neondatabase/serverless"; 

// Import dotenv config so we can use environment variables from .env
import "dotenv/config";  // Automatically loads variables from .env into process.env

export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,                 
            user_id VARCHAR(255) NOT NULL,        
            title VARCHAR(255) NOT NULL,          
            amount DECIMAL(10,2) NOT NULL,        
            category VARCHAR(255) NOT NULL,       
            created_at DATE NOT NULL DEFAULT CURRENT_DATE 
        )`;
        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initializing Database", error);
        process.exit(1); // Exit the process with status 1 (failure)
    }
}


