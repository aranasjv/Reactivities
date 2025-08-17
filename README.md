"# Reactivities" 
dotnet new sln                                // Create new solution file
dotnet new webapi -n API -controllers         // Create Web API project named API
dotnet new classlib -n Domain                 // Create Class Library project named Domain
dotnet new classlib -n Application            // Create Class Library project named Application
dotnet new classlib -n Persistence            // Create Class Library project named Persistence
dotnet sln add API                            // Adds the API project to the solution so it becomes part of the main solution
dotnet sln add Application                    // Adds the Application project (use cases/services layer) to the solution.
dotnet sln add Domain                         // Adds the Domain project (core business logic/entities) to the solution.
dotnet sln add Persistence                    // Adds the Persistence project (Saving and loading of data) to the solution.


//DB first migration 
dotnet ef migrations add InitialCreate -p Persistence -s API        
dotnet ef database update -p Persistence -s API                     //DB migration

dotnet ef database drop -p Persistence -s API                       //DB drop table

dotnet new gitignore        // add git ignore on project

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass // admin on powershell
npm install -D vite-plugin-mkcert //create local certificate authority

npm install axios //install axios for fetch api

//MUi Material
npm install @mui/material@latest @mui/icons-material@latest @mui/lab@latest @mui/x-date-pickers@latest @mui/x-date-pickers-pro@latest

// install material ui
npm install @mui/icons-material@^6.0.0
npm install @fontsource/roboto
npm install @mui/material@^6.0.0 @emotion/react @emotion/styled

//React Query and dev tools
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools

//install react router
npm i react-router

// for date formats
npm install date-fns 