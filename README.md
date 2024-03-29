# Dungeon Master Visualizer v2

This is my third project for Per Scholas. This is a re-write of my original Dungeon Master Visualizer (DMV) to make it a full stack application as well as further define the user experience. The main challenge is to combine all knowledge gained in our course to produce a full stack application with user authentication/authorization, database manipulation and RESTful API requests through a React site.

###### Deployment

Live on [Netlify ](https://animated-otter-4d1e1f.netlify.app/home)and [Render](https://dmv-51st.onrender.com/home)

###### The Problem

I was not happy with the user flow of my first DMV app and a re-write of the experience, implementing a backend with users, seemed like a reasonable challenge (understatement).

###### Planning

* I planned the UX initially with [hand sketches](https://github.com/geracia2/geracia2/blob/main/images/PXL_20240126_183533782.jpg?raw=true "link to sketches") then [wireframed](https://github.com/geracia2/geracia2/blob/main/images/Screenshot%202024-01-25%20230135.png?raw=true "link to screenshot of figma file") in [figma](https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FWG1Ntt6hG0IE12EUV1ZNB7%2FDMV-v2---wireframes%3Ftype%3Ddesign%26node-id%3D0%253A1%26mode%3Ddesign%26t%3DLXzkZsDmoK1Ir3fC-1 "link to figma file")
* I worked with tasks on a [Kanban board](https://nostalgic-football-46c.notion.site/c26674c6f1c44691a8be2ec163bf20e2?v=09c90ef5a0a74e4189eb1fec7c1b338a&pvs=4 "link to notion kanban") to keep track of my separation of concerns client/server.
* RESTful rout testing was done with [Postman](https://github.com/geracia2/geracia2/blob/main/images/Screenshot%202024-01-26%20132906.png?raw=true "screenshot of postman rout testing").
* I also needed to quickly establish an [Entity Relationship Diagram](https://github.com/geracia2/geracia2/blob/main/images/Screenshot%202024-01-26%20110434.png?raw=true "screenshot of ERD in figma") to best plan out Schema relationships especially when working with users in a reference relationship to scenes.

###### What I learned

* Laying out all the data and their relationships is quite important and I learned my initial assumptions of the ERD were wrong, thus my REST routes were wrong. I tackled the REST routs first without having a solid understanding of how to populate scenes with a reference relationship to users. This resulted in re-writing the scene routes but doing so gave me more experience with mapping ERD. It was also quite helpful to produce an [example user object.](https://github.com/geracia2/geracia2/blob/main/images/Screenshot%202024-01-28%20124446.png?raw=true "screenshot of user object")
* Time management and expectations. I ran into many small bugs learning Zustand, API routing, and manipulating referenced data in MongoDB. So what time I had left was considerably less than I planned. I settled to spend my remaining time making a product that worked over adding new features. I plan to add these later!

Future Features

* I planned to add a real [user experience flow](https://github.com/geracia2/geracia2/blob/main/images/Screenshot%202024-01-31%20232049.png?raw=true "screenshot of new user flow") for a first time user, but ran out of time.

###### Unsolved Problems

* Registering a new user should cause a redirect but is currently returning  an error. Likely due to the API response. Adding promises to the register function may solve this.
* I'm still getting odd interactions with loading in a user, grabbing the authentication token from localStorage then [populating models](https://github.com/geracia2/geracia2/blob/main/images/Screenshot%202024-01-29%20184430.png?raw=true "screenshot of state with redux Devtools"), but rendering a conditional message when there are no models.
* FreeSound will some times not accept Axios requests even if they contain the same headers as a fetch.

###### Technologies used

Frontend: [zustand](https://github.com/pmndrs/zustand "zustand state management "), MUI, Axios

Backend: Node, Express, Mongoose, MongoDB
