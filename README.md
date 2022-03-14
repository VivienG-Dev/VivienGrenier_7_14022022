# OpenClassrooms Projet 7 : Créez un réseau social d’entreprise
## Rappel du projet
Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. 

Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

> Il faut que tu utilises un framework Front-End. Libre au développeur d'utiliser le framework de son choix (React, Vue, Angular, Ember, Meteor, Aurelia...).

## Available Scripts

In the project directory, you can run:

### MySQL

If you want to check the database in local you can install [MySQL Workbench](https://www.mysql.com/products/workbench/) or any tool you like to do the job (MAMP etc).

Then you need to create a new database called `groupomania`.

### Installation

Here are the dependancies you need to install:

- NodeJS 12.14 or 14.0.

You need to run `npm install` in each folder (backend/frontend).\
You may need to run `npm audit fix --force` if there is issues.\
Then, run `npm install`.

### Config.json

Inside the folder config you will find `config.json`.\
There is default configuration for localhost but you may need to change few things in `development` like the username and/or password.

### `npm start`

Runs the app in the development mode.\
You can run the backend and the frontend with `npm start`.
- On the backend folder, `npm start` will open [http://localhost:3001](http://localhost:3001)
- On the frontend folder, `npm start` will open [http://localhost:3000](http://localhost:3000) to view it in your browser

The page will reload when you make changes.\
You may also see any lint errors in the console in some situations.

### Admin user

There is no actual admin interface in this V1 but in the users table you can set a user as admin by changing the column `isAdmin` by `0` to `1`, refresh the page and you should be able to delete/modify any post/comment and be able to go to (empty for now) an Admin page.

## Learn More

This app was created with React ([Create React App](https://facebook.github.io/create-react-app/docs/getting-started))
and [Bootstrap](https://react-bootstrap.github.io/).

### Estimated time for a V2

This was finally not a requirement but I made an estimation for a possible V2 of the project (made in French)
