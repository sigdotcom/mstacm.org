# Migrations
## What is a migration
When making changes to the schema for the database, we must generate what are called "migrations".
These allow current rows in the database to be modified into the shape of the new schema.

## How to make migrations 
1. Purge your development database and turn off the api.
    #### If you are using `docker`:
    ```bash
    docker-compose down
    ```
    #### If you are running a local `PostgreSQL` database:
    Drop the database.
   
2. Recreate the database and start `api` in "production" mode.
    You must start `api` in "production mode" so that you will not have database synchronization enabled,
    which ensures the database is always the same as the schema and is useful for debugging.

    #### If you are using `docker`:
    1. Comment out [this line in docker-compose.override.yml](docker-compose.override.yml#L16)
        ```yaml
        phoenix_web:
            # This line runs the api in development mode
            command: yarn start:dev
        ```
    2. Uncomment [the next line in docker-compose.override.yml](docker-compose.override.yml#L15)
        ```yaml
        phoenix_web:
            # This line builds and runs in production mode instead
            command: bash -c "yarn build && yarn start:prod"
        ```
    3. Start it:
        ```bash
        docker-compose up
        ```
    
    #### If you are running the database and `api` locally:
    1. Remake the `phoenix` database
    2. Start `api`
        ```bash
        yarn build && yarn start:prod
        ```

    ----
    What these changes do is skip [three lines](api/src/main.ts#L24) which cause the
    synchronization each time the `api` starts by setting the `NODE_ENV` environment variable
    to "production".

3. Your database is now out of sync with your code, which is good.

    **Verify that the changes you have made to the database schema are not present in the database now**.

4. Generate the automatic migration using `typeorm`
    ```bash
    yarn typeorm migration:generate -n <feature-name>
    ```
    where `<feature-name>` is the nice name for what changed.
    (Ex. UserShirts for a feature where users now have shirts in the database)
    
5. Check that the database now looks as it should, and edit the migration file
    located in [the migrations folder](api/src/migrations) to make sure that only the parts of the schema **you changed** are
    being modified.
    
    > Any `DROP`s are a sign of bad news. There is also a few lines involving the product table and a field becoming numeric
    that are not supposed to be in there but always are added due to a bug. These should be removed.
    
    If the migration is wrong it is up to you to amend the SQL queries to make the migration work as it needs to.
    
6. Test your migration
    
    Rerun the steps to delete and rebuild the database by hand and make sure that the default entries are all looking as
    expected and no errors occur. This is a dry run on a development database of exactly what will happen in production.
