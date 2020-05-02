# CRUD-Operation
Create a folder in local machine to save the project from git.
Copy the link from github repository "JenniferJeyasekar/CRUD-Operation". Select clone.
Open cmd prompt in local machine and navigate to the folder created in step 1.
Enter the cmd "git clone <paste the url copied in Step 3>"to clone the files from the github repository. For this project, enter the cmd "git clone https://github.com/JenniferJeyasekar/CRUD-Operation.git " and press enter.
Confirm the project files are cloned to the folder created in step 1.
Navigate to <created folder>/CRUD-Operation/Server-src and enter npm install. This will install server and other dependencies from package.json.
Once the installation is complete, enter the command "npm start". This will start the server and listen on the port specified.
Open another cmd prompt and enter the command "node launchDynamoDb.js". This will start dynamodb.
Open another command prompt, navigate to <created folder>/CRUD-Operation/Client-src and enter the command "npm install". This will install client and all other dependencies in package.json file.
Once the installation is complete, enter the command "npm start". This will start the Client in default port 3000.
