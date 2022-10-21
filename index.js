const inquirer = require('inquirer');
const fs = require('fs');

// Collect user input
inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is your project title?',
      name: 'title',
    },
    {
      type: 'list',
      message: 'What license does this application use:',
      name: 'license',
      choices: ['None', 'MIT_License', 'Apache_License_2.0', 'GNU_General_Public_License_v3.0', 'Mozilla_Public_License_2.0'],
    },
    {
        type: 'input',
        message: 'Provide a description of the application:',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Provide installation instructions if necessary:',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Provide instructions and examples for use.',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'List any collaborators you would like to credit:',
        name: 'credits',
    },
    {
        type: 'input',
        message: 'If you would like to invite other developers to contribute explain how they can do so:',
        name: 'contribute',
    },
    {
        type: 'input',
        message: 'Provide examples of tests to run on your application:',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'github',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
  ])
  .then((response) => {

// Create Header
var content = 
` # ${response.title} `
if (response.license != 'None') {
    content +=
` 
![](https://img.shields.io/badge/License-${response.license}-blue) 
`}

if (response.description) { content +=
` 
## Description

${response.description} 
`}

// Create Table of Contents
if (response.installation || response.usage || response.credits || response.contribute || response.tests) {
    content += 
` 
## Table of Contents `}

if (response.installation){ content += `
 - [Installation](#installation) `}

if (response.usage){ content += `
 - [Usage](#usage) `}

if (response.credits){ content += ` 
 - [Credits](#credits) `}

if (response.contribute){ content += `
 - [Contribute](#contribute) `}

 if (response.tests){ content += `
 - [Tests](#tests) `}


//  Create Content
 if (response.installation){ content += `

## Installation

${response.installation}`}

if (response.usage){ content += `

## Usage
 
${response.usage}`}

if (response.credits){ content += ` 

## Credits
 
${response.credits}`}

if (response.contribute){ content += `

## Contribute

${response.contribute}`}

if (response.tests){ content += `

## Tests

${response.tests}`}

// Create Footer
if (response.license != 'None') {
    content +=
` 

## License

This application is covered under the ${response.license}.
`}

if (response.github || response.email){
    content += 
`
## Questions? 

Contact me at: `
if(response.github){content+= `

https://github.com/${response.github} `}
if(response.email){content+= `

${response.email} `}}


// Create .md file containing user input if project name exists
if(response.title){
    fs.writeFile(`${response.title}.md`, content, (err) =>
    err ? console.log(err) : console.log('Success!')
    )} else {console.log("Project name needed to create file.")}
    });