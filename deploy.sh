#!/usr/bin/env bash
BACKUP_PATH="../../backups"

cd apps
docker-compose -f docker-compose.yml \
               -f docker-compose.production.yml \
               pull

mkdir -p $BACKUP_PATH

# Make a backup incase deployment causes an issue.
# To restore, use the following command
# cat <YOUR_BACKUP_FILE> | gzip -d | docker exec -i api_phoenix_db_1 psql -U phoenix postgres
# NOTE: api_phoenix_db_1 is the name of the container running 
# the database. If this fails, check that the docker container exists by
# running docker ps.
docker exec -t api_phoenix_db_1 \
      pg_dumpall -c -U phoenix | \
      gzip > $BACKUP_PATH/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql.gz

docker-compose -f docker-compose.yml \
               -f docker-compose.production.yml \
               up -d
cd -
