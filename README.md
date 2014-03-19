# Web Rebels 2014 Conference

This is the source code for the Web Rebels 2014 Conference web site.



# Before we start

Where you check out your code from github is entirely up to you and every time 
this document refer to ```{project_path}``` it does refer to the path where you 
have chosen to check out this project.



# Development

This is a [node.js](http://nodejs.org/) application. The structure of this 
project is built as an [npm](https://npmjs.org/) package for easy development 
and distribution.


## Getting up and running

Install [node.js](http://nodejs.org/) according to the documentation of the 
node.js project.

### Install dependencies:

    cd {project_path}
    npm install

### Start the server:

    cd {project_path}
    npm start

You should now be able to access the application at 
[http://localhost:8000/](http://localhost:8000/)



# Deployment to production

This application is hosted at [Nodejitsu](https://www.nodejitsu.com/). To deploy 
to production you need to install [Jitsu](https://github.com/nodejitsu/jitsu) 
which is the commandline tool to administer applications running at Nodejitsu. 

The Jitsu tool is installed by the following command:

    npm install jitsu -g

Jitsu is then installed globally so it can be executed from any path. 

To deploy (or run any other operation on our app), one need to log in. Login is 
done by the following command:

    jitsu login

When logged in your able to operate the applications running on Nodejitsu.

To deploy this application to Nodejitsu, run the following commands:

    cd {project_path}
    jitsu deploy

Then accept the updating of the applications version number and then the 
application will be deployed to production. If everything is OK, jitsu should 
report an OK when the new version is up and running in production.



# Develop

This is a pretty simple app where all html and content is placed in the ```view```
directory. Though, the application is as mentioned a node.js app which has a
configuration and knowledge about if its running in development or production
mode. This knowledge and configuration is also the base for a build system
which minify CSS and JS files so its important that one follow a couple of
rules when developing.


## I want to add some CSS or JS to the application

If you want to add a new CSS og JS file to the application, this is done
by placing the CSS file in ```./public/src/css/``` or the JS file in
```./public/src/js/```.

Then add the CSS file to the ```cssFiles``` Array or add the JS file to the 
```jsFiles``` Array in ```./config/development.json```. Then restart the server
and the file will be appended to the head of the document.

It is important these files is added here because this information is used
when one build the application before its pushed to production.

## Twitter