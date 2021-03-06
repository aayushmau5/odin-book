# odin-book

### Frontend

- NextJS

- Sass

- Framer Motion(For animations)

- Apollo Client

### Backend

- Express

- Apollo Server

- TypeGraphQL

- Prisma ORM

- Postgres

## Setting up postgres docker

1. Make a volume where postgres will store its data, `docker volume create pgdata`

2. Run postgres docker image, `docker run --name postgres -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -d -p 5432:5432 -v pgdata:/var/lib/postgresql/data postgres:latest`

3. Using the postgres container interactively, `docker exec -it postgres psql -U username -c "command"`

4. Stop the container, `docker container stop postgres`

5. Start the container, `docker start postgres`
