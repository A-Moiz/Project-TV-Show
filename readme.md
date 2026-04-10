# TV Show & Episode Guide 🎬

A dynamic, responsive web application built to take structured data from an external API and display it to users in a clear, interactive format. This project was completed as part of the CodeYourFuture (CYF) Data Flows module.

***

## 🌐 Website Link
You can view the live project here:  
👉 https://cyf-a-moiz-tv.netlify.app

***

## ℹ️ Website Information
The aim of this project is to take data exposed over the [TVMaze API](https://www.tvmaze.com/api) about TV shows and their episodes and make it easy for people to understand. 

### Key Features:
- **Dual Views**: Toggle seamlessly between a full directory of global TV shows and a detailed grid layout of specific episodes.
- **Dynamic Search**: Instantly filter shows by their name, genres, or summaries. Once a show is selected, search specific episodes by title or summary.
- **Smart Fetching & Cache**: Show data is listed alphabetically on launch. Episode data is fetched via API on-demand and stored to prevent redundant network requests.
- **Deep Linking**: Quick-jump to an exact episode using the dynamic dropdown list.

***

## 🛠️ Technologies & Rules Used
In adherence to the coursework rules, no external libraries or frameworks (such as React, Vue, or jQuery) were used. The application relies entirely on vanilla web technologies practiced during the course:
- **Semantic HTML5**: To ensure the application is accessible and scores 100 for Accessibility on Lighthouse.
- **CSS3**: Custom properties (variables), Flexbox, and CSS Grid to construct a fully responsive layout.
- **JavaScript (ES6+)**: Powered by DOM manipulation, asynchronous operations (`async/await`), event listeners, and array manipulation methods.
- **TVMaze API**: All content, images, and summaries are queried dynamically from the official free TVMaze API endpoints.

***

## 📚 Coursework Information
This project was developed as a coursework assignment for **Code Your Future (CYF)**. It was completed incrementally by following the requested milestones up to Level 500 during the Data Flows module.

### Specific Learning Objectives:
- Consume structured data in JavaScript using `fetch`.
- Build UI components dynamically and update them in response to user input.
- Make sense of a codebase produced by someone else and refactor it to make it easier to understand.
- Collaborate with another programmer in a single shared GitHub repository by swapping codebases across alternate levels.

***

## 👨‍💻 Author
- **Abdul Moiz** (GitHub: [@A-Moiz](https://github.com/A-Moiz))
- **Partner** (GitHub: [@ashaahmed7](https://github.com/ashaahmed7))
- **Partners repo:** https://github.com/A-Moiz/Project-TV-Show-Partner

***

## 🚀 How to Run Locally

If you would like to test or contribute to this project locally, follow these steps:

1. **Clone the repository:**
`git clone https://github.com/your-repo-name.git`
2. **Navigate into the directory:**
`cd your-repo-name`
3. **Run a local server:**
Open the `index.html` file using a local development server (like the Live Server extension in VS Code) to prevent CORS issues.
