# CultureWikiHub Project

**Theme** :- Build for Himalayas -----> Preserving cultural heritage.

This project is built using Next.js and MongoDB. We would like to extend our gratitude to [hoangvvo/nextjs-mongodb-app](https://github.com/hoangvvo/nextjs-mongodb-app) for providing the initial template that served as a foundation for our project.

## Project Overview

**CultureWikiHub** is a web application designed to serve as a platform for preserving traditional and cultural writings, including regional songs, poems, stories, recipes, and more. It allows multiple users to contribute and collaborate on preserving these cultural treasures. Users can view all the posts, suggest changes, and vote on suggested edits. Changes are implemented once they receive a maximum number of votes.

## Features

The current version of the app includes the following features:

1. **User Authentication:** Users can sign up and log in to the platform to participate.

2. **Create Posts:** Authenticated users can create new posts, preserving cultural content.

3. **Comments:** Users can comment on existing posts, facilitating discussions and additional context.

## Project Aim

The primary aim of CultureWikiHub is to preserve cultural and traditional knowledge for future generations. This project offers a sustainable solution where individuals within a community actively contribute to the preservation of their cultural heritage.

## Roadmap

Our roadmap includes the following features and improvements:

1. **Duplicate Post Detection:** Implement AI to detect and prevent the posting of duplicate content, ensuring a diverse and unique collection.

2. **Suggested Change Handling:** Utilize AI or another approach to handle suggested changes more accurately, promoting the preservation of the most authentic cultural content.

3. **Advanced Search Options:** Provide users with the ability to search for posts by language, tags, and the type of content (songs, poems, stories, recipes, etc.).

4. **Collaborative Editing:** Enable users to collaborate on posts, suggesting edits and improvements for better accuracy.

5. **Enhanced Voting System:** Improve the voting system to make it more intuitive and effective in selecting the most valuable changes.

6. **Mobile App:** Develop a mobile app version to reach a wider audience and make cultural preservation more accessible.

7. **Community Building:** Promote community engagement and participation through events, challenges, and incentives.

8. **Translation Support:** Offer translation features to make cultural content more accessible to a global audience.

We are committed to continuously enhancing CultureWikiHub to better serve its purpose of preserving and celebrating cultural heritage. Your contributions and feedback are highly appreciated!

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Prashantt423/CultureWikiHub.git`

2. Install dependencies: `npm install`

3. Create a `.env` file in the root directory and add the following environment variables:

   - `MONGODB_URI`: The MongoDB Connection String (with credentials and database name)
   - `CLOUDINARY_URL` (optional, Cloudinary only): Cloudinary environment variable for configuration. See this.
   - `NODEMAILER_CONFIG` (optional, if using nodemailer only): JSON stringified nodemailer config. eg. `{"service":"Gmail","auth":{"user":"hoangvvo.02@gmail.com","pass":"aHR0cHM6Ly95b3V0dS5iZS9kUXc0dzlXZ1hjUQ=="}}`

4. Run the following commands:

   - `npm i`
   - `npm run dev` to start the local development server.

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the app.

## Contributors

- [Prashant Kashyap](https://github.com/Prashantt423)
- [Adarsh Kumar Gupta](https://github.com/Adarsh2604)
- [Om Sharma](https://github.com/om-sharma03)

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute, provide feedback, or share your ideas to make CultureWikiHub even better!

![CultureWikiHub Logo](culture-wiki-hub-logo.png)
