import React from "react";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL2,
});

export default pool;
