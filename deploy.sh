#!/usr/bin/env bash
BACKUP_PATH="../../backups"

cd api
docker-compose -f docker-compose.yml \
               -f docker-compose.production.yml \
               pull

mkdir -p $BACKUP_PATH

docker exec -t api_phoenix_db_1 \
      pg_dumpall -c -U phoenix | \
      gzip > $BACKUP_PATH/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql.gzip

docker-compose up -d
cd -
