
<img width="300" alt="loginlogo" src="https://user-images.githubusercontent.com/34731628/84478450-553aaa00-ac5f-11ea-91a1-ae485e3e8717.png"> ![builder](https://user-images.githubusercontent.com/34731628/84472619-83b38780-ac55-11ea-9a0f-17467eb573f5.png)

## Problem 
   As someone who helps out with my family construction business, I notice many times that my father tends to have difficulty finding the right construction workers for a given contract. Many times due to the lack of time, he ends up having to drive around neighborhoods in order to pick up works who wait for contractors to offer them a temporary job.

   An analysis in the most recent Survey data by the National Association of Home Builders' Housing Economics shows that the percentage of *immigrant workers constitute nearly **25%** of the overall construction workforce*, however those workers tend to have difficulty obtaining jobs due to legal paperwork. On top of that, **70% of construction workers have a HS DIPLOMA**, with the second most common being with **NO education at 23%** *. This is a large issue as workers in today’s society, where high waged jobs reflect your level of education/professional network.


## Solution 
   This is why Fancio was developed. Fancio is a web app that **CONNECTS labor workers with contractors** looking for workers to help finish the job. This bridge between workers and contractors allows a *seamless and friendly bridge of connection* and provides both ends to have a *platform that is tailored for them* unlike other services websites (like Fiverr, Upwork, Craigslist) where the target audience is extremely broad and difficult to land a gig. On top of that, because of the Coronavirus pandemic, many of these laborers have lost their corporate jobs, especially those who physically go out to find jobs. With Fancio, workers and contractors will be able to present themselves by showing their professional profile to other individuals digitally, and keep in touch while looking/posting different opportunities online without the shady interactions on other job sites now that the country is slowly opening up again.

## Future Work
   - Work on signup screening process to verify user skills/credentials
   - Work on info/progress page for immigrant workers to track progress on legal paperwork
   - Seamless / food buying integration for contractor to buy workers food

## Tech Stack | Design | Workflow
        Software Architecture
        
<img width="612" alt="fancio_arch" src="https://user-images.githubusercontent.com/34731628/84442586-ee3fd580-ac0b-11ea-9c53-7897b9a35b36.png">

        Contractor Side
        
![contractorWorkflow](https://user-images.githubusercontent.com/34731628/84558521-62a87080-ad01-11ea-9d4c-2ab39a2e9f5f.png)

        Labor Worker Side
        
![WorkerWorkflow](https://user-images.githubusercontent.com/34731628/84558538-971c2c80-ad01-11ea-80b3-aa1ee2f7df2d.png)

## Running Application 
- git clone
- Client Side: https://fancio-app.herokuapp.com/ || cd client, npm install, npm start
- Backend Side: cd backend, npm install, nodemon server.js

## Resources Used
- Freepik, Skyclick icons @[flaticon.com](https://flaticon.com)
- Lucas Bassettis: [simple-chatbot-app-plugin](https://lucasbassetti.com.br/react-simple-chatbot/)
- [Twilio SMS API](https://twilio.com) Documentation Cod
- [GitGuardian](https://gitguardian.com/) for security checks
- [My Kanban Board](https://github.com/salmansiraj/Fancio/projects/1) via Github Projects to track progress
- Heroku for deployment
- Firebase for image/file storage
- [MongoDB + Atlas](https://www.mongodb.com/cloud/atlas) for deploying DB service to cloud
