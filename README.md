# Car Dealership

## Prerequisites

This project requires NodeJS (version 8 or later), Pip and Yarn.
[Node](http://nodejs.org/), [Pip](https://pypi.org/project/pip/) and [Yarn](https://yarnpkg.com/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v
8.3.0
$ yarn -v 
1.22.18
$ pip -V
pip 22.2.2
```

## Table of contents
* [Prerequisites](#prerequisites)
* [General info](#general-info)
* [Technologies](#technologies)
* [Backend setup](#backend-setup)
* [Frontend setup](#frontend-setup)
* [Contributing](#contributing)

## General info
Main purpose of this web app is to store information about cars available in a car dealership.
The four CRUD functions can be called by users to perform different types of operations on selected data within the database. This could be accomplished  through 
a graphical user interface. 
To facilitate work with the application, two databases are created. Main one stores essential information allowing to distinguish one car among others e.g. car name, date of purchase or car photo. Auxiliary database stores car brands names so that there is possibility to select brand from a list rather than write it every time new item 
is added to main database.

## Technologies
Project is created with:
* Django 4.1
* JS/React 17.0.1
* HTML5/CSS3
* [React-Bootstrap](https://react-bootstrap.github.io/)

## Backend setup

**BEFORE YOU INSTALL:** please read the [Prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/domjed/Car-Dealership.git
$ cd Car-Dealership/backend
```

Create a virtual environment

```sh
$ python -m venv venv
$ source env/bin/activate
```

Then install the dependencies:

```sh
(venv)$ pip install -r requirements.txt
```
Note the `(venv)` in front of the prompt. This indicates that this terminal
session operates in a virtual environment set up by `venv`.

Once `pip` has finished downloading the dependencies, run the dev server

```sh
(venv)$ python manage.py runserver
```

## Frontend setup

**BEFORE YOU INSTALL:** please read the [Prerequisites](#prerequisites)

Once the repsitory has been cloned previously, go to main frontend directory:

```sh
$ cd frontend
```

Install all dependencies using yarn:

```sh
$ yarn install
```

Once `yarn` has finished installing the dependencies, create a .env file at the root 
directory of your frontend application.

```sh
$ cd . > .env
```
Update `.env` file using your own credentials. Example of necessary variables to run 
the application is provided in `.env.example` which can be found in the same directory

Start the project:

```sh
$ yarn start
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).
