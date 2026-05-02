# EcoGest API

## How to run the project

The project uses tsx which is an TypeScript execution environment for Node, with this tool we can run the TS code in
Node without needing to compile it first. We added the correct script in the package.json file, so to run the project
you just need to execute the following command in the terminal:

`npm run dev`

## Access PostgreSQL database

`sudo -u postgres psql`

`psql -h localhost -U ecogest_db_user -d ecogest_db`

## API Testing

The project as a Postman collection inside the folder `docs/Postman`

Steps to import and test:

- Import `EcoGest.postman_collection.json` into Postman.
- Fill the necessary env values
- Test the endpoints freely