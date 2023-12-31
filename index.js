// import files/modules

import { issueInsert } from "./issue-form.js";

document.querySelector(".input-section-el").innerHTML = issueInsert;

// 1. declare all variables
const form = document.getElementById("issue-form");

const issueObjectArray = [];

// ***********************************
// 2. CREATE CONSTRUCTOR FUNCTION CLASS
// ***********************************

class issueObject {
  constructor(issue, priority, date, assigned, assignor) {
    this.issue = issue;
    this.priority = priority;
    this.date = date;
    this.assigned = assigned;
    this.assignor = assignor;
    this.isClosed = false; // Initialize the state as "open"
  }
}

// ***************************
// EVENT LISTENER FOR THE FORM
// ***************************

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // CHECK THAT PRIORITY HAS BEEN SELECTED
  const dropDown = document.getElementById("dropdown");
  const selectedOption = dropDown.options[dropDown.selectedIndex];

  if (dropDown.value === " " || selectedOption.disabled) {
    // The dropdown is not selected or the selected option is disabled
    // Display an error message or take appropriate action
    alert("Please select a priority");
    return; // Stop form submission
  }
  // If form validation passes, proceed with form submission
  // END OF PRIORITY CHECK
  // generate new object
  createNewObject();
  // render new object to the DOM
  renderObject();
  // reset form values upon event listener trigger
  resetValues();
});

// Global variables
let issue;
let priority;
let date;
let assigned;
let assignor;
let ident;
let isClosed;
let ukDateFormat; // Declare ukDateFormat as a global variable

// **************************
// CREATE NEW OBJECT FUNCTION
// **************************

// create new object - collect data from form function
function createNewObject() {
  // Assign values to the global variables
  issue = document.getElementById("description").value;
  priority = document.getElementById("dropdown").value;
  date = document.getElementById("date").value;

  // convert date
  let options = { day: "numeric", month: "numeric", year: "numeric" };
  ukDateFormat = new Date(date).toLocaleDateString("en-GB", options); // Assign the formatted date to the global variable

  assigned = document.getElementById("assigned").value;
  assignor = document.getElementById("assignor").value;
  ident = generateRandomID();

  const newIssueObject = new issueObject(
    issue,
    priority,
    date,
    assigned,
    assignor,
    ident,
    isClosed
  );
  issueObjectArray.unshift(newIssueObject);
}

// **********************
// RENDER OBJECT FUNCTIONd
// **********************

function renderObject() {
  const objectElement = document.createElement("div");
  objectElement.classList.add("issue-output-box");
  const priorityColors = {
    low: "lightblue",
    medium: "orange",
    high: "red",
  };
  const priorityColor = priorityColors[priority];
  objectElement.innerHTML = `
    <div class="id-date-output-box">
      <div class="id-output">ID: ${ident}</div>
      <div class="date-output">Due date: ${ukDateFormat}</div>
    </div>
    <h2 class="issue-output">${issue}</h2>
    <div class="priority-status-box">
      <div class="priority-output" style="background-color: ${priorityColor}">${priority}</div>
      <div class="status-output">OPEN</div>
    </div>
    <div class="assigned-assignor-box">
      <div class="assigned-output">Assigned to: ${assigned}</div>
      <div class="assignor-output">Assigned by: ${assignor}</div>
    </div>
    <div class="button-container">
      <button class="close-button">Close</button>
      <button class="delete-button">Delete</button>
    </div>
  `;
  const buttonContainer = objectElement.querySelector(".button-container");
  buttonContainer.addEventListener("click", function (event) {
    const button = event.target;
    if (button.classList.contains("close-button")) {
      // select the specific objectElement containing the clicked close button
      const objectElement = button.closest(".issue-output-box");
      // Change the innerHTML of the child element
      const statusOutput = objectElement.querySelector(".status-output");
      statusOutput.innerHTML = "CLOSED";
      // Adding a class to a child element
      const closeBtn = objectElement.querySelector(".close-button");
      closeBtn.classList.add("delete");
      // change close status
      isClosed = true;
    } else if (button.classList.contains("delete-button")) objectElement.remove();
  });
  document.getElementById("output-section-el").appendChild(objectElement);
}

// **************************
// RESET FORM VALUES FUNCTION
// **************************

function resetValues() {
  issue = document.getElementById("description").value = "";
  priority = document.getElementById("dropdown").value = "";
  date = document.getElementById("date").value = "";
  assigned = document.getElementById("assigned").value = "";
  assignor = document.getElementById("assignor").value = "";
}

// ***********************************************
// FUNCTION TO GENERATE RANDOM ID FOR ISSUE OBJECT
// ***********************************************

function generateRandomID() {
  let id = "";
  const characters = "0123456789abcdef";

  for (let i = 0; i < 8; i++) {
    id += characters[Math.floor(Math.random() * characters.length)];
  }
  return id;
}

// *************
// FILTER
// *************

// *************
// LOCAL STORAGE - SAVE
// *************
