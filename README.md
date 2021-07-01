# The Art Galore

## Project Summary
**Project Context**
The Art Galore(TAG) is a mobile-responsive open platform for artists to browse through art, leave reviews for art, and also share their art with the public.

**Organisational Goals**
The web app aims to promote the freedom and idea of sharing art to the public and exchanging constructive feedback in the art community. Through providing and receiving reviews, artist can make use of the feedback to improve on their art. 

**User Goals**
The aim of users is to gather reviews for their art. These reviews can be helpful in helping them pinpoint the areas they can work on.

**Justification for the App**
Many art platforms provides a platform for people to post and share their art however this art platform encourages leaving reviews to help artist grow. Creation of art post and reviews are made easy through the features implemented (e.g. art post and reviews can be made within a single click)

## Project Complexity

Access the Project Complexity Matrix [here](https://github.com/kshannn/react_art_gallery/blob/master/public/project_complexity.pdf).

## UX/UI
### **Stategy**
_Organisation_
* Objective: Provide a platform to encourage sharing of constructive feedback within the art community

_User_
* Objective: To get reviews for the art that they shared

* Needs: An art platform that encourages reviews

* Demographics:
    * Artists who do digital/traditional art and seeking for improvement from public feedback
    * Sufficient literacy in using technological devices

* Pain point: Can be difficult to get constructive feedback from other platforms 

User Stories | Acceptance Criteria(s)
------------ | -------------
As an artist who is looking for feedback on my art, I want to be able to easily post my art onto a platform where I can gain feedback so that I can improve on my art based on them  | Feature that allows ease of posting art


### **Scope**
_Functional Specifications_
* Create, read, update, delete art posts

* Create, read, update, delete reviews

* Search for art post 

* Filter art post

_Content requirements_

* Details about the art post (e.g. name of poster, title of art, description of art, date posted etc.)

* Details about the reviews (e.g. name of reviewer, date posted, content of review)

_Non-functional requirements_
* Mobile responsiveness
    * Achieved via the use of bootstrap media queries,bootstrap grid columns, and flex box
* Performance

### **Structure**

<img src='./public/site_map_art_gallery.png'><br>


* TAG web application is structured using a tree hierarchy .


* The app uses language that is easy for users to understand and contains no technical jargons

### **Skeleton**
Access the wireframes for small, medium, and large devices for the website [here]()

### **Surface**

_Colours_

<img src='./public/art_gallery_colour_palette.png' style='display:block'>
<br>

* The main colours used to design the website are based on the colours in the logo. The colours consist of different shades of red, blue, and yellow which are primary colours. As all colours can be created from primary colours, it is a fitting palette for an art website that encourages creation of art from even its most simple form.

_Font Choice_
* The font used throughout the website is san-serif to match the brand logo. The use of san-serif also makes words easier to read.


## Features

1. **Users can create, update, and delete art posts.** With just a click of a "create" button, users are directed to a forms page where they can fill up the details to make their art post. Their new art would then be updated in the gallery page. Once a user has clicked into a particular art post, they are able to edit or delete the art post through a dropdown button represented by an ellipses icon. 

2. **Users can create, update, and delete reviews.** Users can easily leave reviews for an art post by clicking into a particular art post and filling up the review form immediatelly. This feature encourages users to leave reviews with a call-to-action message "Help out another fellow artist by leaving a review!" and remove "roadblocks" having the form on the same page, thereby making it easier for users to create a review with a single click. Users are also able to update and delete reviews through a dropdown button represented by an ellipses icon. 

3. **Users can quickly search for an art post by the name of the artist or the art title.** In the event that users already have an art or an artist that they want to search for, they could do so easily by searching their query with the search bar.  

4. **Users can filter art appearing on their gallery based on the art type and art subject.** This feature can be useful if users only wish to retrieve art results of a particular search criteria. For example, users can filter out all the traditional arts and retrieve only arts that are tagged as "digital art".

5. **Section in every art page dedicated to showing other arts in the form of thumbnail.** This feature allows users to be able to navigate to other arts more easily. Through such implementation, users would be more likely to visit other art work and as a result increase their likelihood of leaving a review.

_Limitations and future implementations_
* In the future, I would like to implement pagination so that users can click through the pages to browse the art posts instead of scrolling. This also relieves the load on the database and web application by limiting the number of results returned.

## Testing

**Test Cases**

**Testing for Mobile Responsiveness**

## Technologies Used

* HTML5
    * To create import CDN for Bootstrap and Font Awesome
* CSS3
    * To style various elements throughout the web app
* JavaScript
    * To include interactive elements throughout the web app

* [React](https://reactjs.org/)

* [Bootstrap v5.0.1](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
    * For offcanvas, alerts, navbar

* [Git](https://git-scm.com/)
    * For version control

* [GitHub](http://github.com)
    * To create repository and store source code

* [Balsamiq Mockups 3](https://balsamiq.com/)
    * To create wireframes

* [Netlify](https://www.netlify.com/)
    * To deploy React application

* [Google Font](https://fonts.google.com/)
    * To select font families used for web app (i.e. IM Fell English, Lato, Karla)
* [Multi Device Website Mockup Generator](https://techsini.com/multi-mockup/index.php)
    * To display screen-responsiveness of website across different devices

## Deployment

The web app is hosted using Heroku (for Express NodeJS) and Netlify (for React).

**Steps to deployment using Netlify**


## Dependencies

* [MongoDB](https://www.mongodb.com/)
    * To store data

* [Axios](https://cdnjs.com/libraries/axios)
    * To call API

## Credits

* Brand logo 
    * Taken and edited from [Artist Repetory Theatre's website]([https://artistsrep.org/announcing-arts-new-logo-and-branding/](https://artistsrep.org/announcing-arts-new-logo-and-branding/) (Art logo edited))

* Design of website inspired by [DeviantArt](https://www.deviantart.com/)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
