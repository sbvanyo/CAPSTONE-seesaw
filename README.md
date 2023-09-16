# see.saw

## Overview:
see.saw is a web app designed to simplify and streamline playground discovery so that users can get out there and P L A Y. Users can explore, create, curate, filter, and search for playgrounds in the Nashville area--all in one playfully designed and easy-to-use application. 

## Features:
***Playgrounds***
* Authenticated users have access to peruse all playgrounds on their homepage.
* Additional details for each playground include its neighborhood, address, features, a "hot tip" to know before visiting, and its location on an interactive Google map.
* Ability to create and submit new playgrounds to be added to the public collection.
* Simple buttons on each playground card allow users to check off playgrounds they have visited, as well as "favorite" the very best ones.

***Neighborhoods***
* Users can browse Nashville's neighborhoods and view a list of playgrounds within a given area. Explore the hidden gems in your own neighborhood!
* New neighborhoods can be created to encompass new cities or other pockets of town if desired.

***Play Map***
* View the locations of every playground on one big, interactive Google Map to get a sense of where playgrounds are relative to your location.
* When a new playground is created, the play map is automatically updated with a marker for the new location.
* When a map marker is clicked, a modal displays the playground's address.

***User Profile***
* Each user's unique profile includes basic stats: their profile picture, email, and time of last login.
* When a playground is marked as "visited" (by clicking the checkmark button), it is added to the user's visited list, and the grand total of visited playgrounds is updated in the user's profile. How many can you visit?!
* When a playground is marked as a "favorite" (by clicking the heart button), it is added to the user's favorites list, visible as cards in the user's profile. Easily keep track of the best ones and let kids choose where they'd like to play from the playground images.


## Target User:
The target user for this application is anyone who cares for kids (or is a kid at heart)! Parents, grandparents, aunts, uncles, nannies, babysitters, camp counselors, and other caregivers of all kinds will reap the benefits of this app--*hopefully,* spending less time finding the perfect playground and more time PLAYING.

## Screenshots:

<hr>

**[Link to Figma wireframe](https://www.figma.com/file/R9VJnIVuSdVMj410NqbWL1/see.saw?type=design&node-id=0%3A1&mode=design&t=31vtHv72WHYrliwP-1)**

**[Link to Entity Relationship Diagram](https://dbdiagram.io/d/see-saw-64dc079b02bd1c4a5ed470ab)**

**[Link to GitHub Project Board](https://github.com/users/sbvanyo/projects/1)**


**Contributors:**
* This app was created by Stacey Vanyo - https://github.com/sbvanyo





## Topics
- [Get Started](#get-started)
- [Starting the Project](#starting-the-project)
- [Using axios](#using-axios)
- [Deploying on Netlify](#deploying-on-netlify)
___
## Getting Started
### Use Template
#### 1. To get started, click the GREEN "Use this Template" button at the top of the repo
<img width="915" alt="Screen Shot 2022-07-06 at 12 54 01 PM" src="https://user-images.githubusercontent.com/29741570/177612998-4aac9237-5a1e-4f13-8ae0-468587521564.png">

#### 2. Make sure YOUR github account is selected in the dropdown and name your project
<img width="763" alt="Screen Shot 2022-07-06 at 12 54 48 PM" src="https://user-images.githubusercontent.com/29741570/177613126-dd38f678-7553-4f27-8a4a-75680f14d71e.png">

#### 3. Clone your new repo to your local machine
#### 4. Go to the **NEXT** section

## Starting the Project
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">

### Deploying on Netlify
Netlify will automatically detect your project and prepopulate the settings, but should something go wrong and it does not, here are the commands:

- Build Command: `npm run build`
- Publish directory: `.next`

#### Additional Steps to Take on Netlify
- Add Environmental Variables
    - Any Enviromental variables you are using in your `.env` file should be added to Netlify. 
        - Go to Site settings > Build & deploy > Environment > Environment variables and the keys and values there.

- Update Firebase URL Settings
    - In Firebase under Authentication select sign in methods, scroll to Authorized domains. Add your Netlify URL.
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
