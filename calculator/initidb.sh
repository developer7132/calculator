psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d "$POSTGRES_DB" <<-EOSQL
    DO
        $do$
            BEGIN
                IF EXISTS (
                    SELECT FROM pg_catalog.pg_roles
                    WHERE rolname = "$POSTGRES_USER") THEN
                    
                    ALTER ROLE $POSTGRES_USER SET client_encoding TO 'utf8';
                    ALTER ROLE $POSTGRES_USER SET default_transaction_isolation TO 'read committed';
                    ALTER ROLE $POSTGRES_USER SET timezone TO 'UTC';
                    CREATE DATABASE IF NOT EXISTS $POSTGRES_DB;
                    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB to $POSTGRES_USER;
                    RAISE NOTICE "Role "$POSTGRES_USER" already exists. Skipping.";
                ELSE
                    CREATE ROLE $POSTGRES_USER LOGIN PASSWORD $POSTGRES_PASSWORD;
                END IF;
            END
        $do$
    DO
EOSQL