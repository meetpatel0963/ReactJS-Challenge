# FactWise React Js Challenge 😎

## Expected Outcomes: ✨

1. Fetch the current Date and Vaccination Information of the people from the "public/data" folder using axios or fetch library.

2. Display the fetched current Date between the 2 buttons and Add increment by 1 functionality to the "+" button, add decrement by 1 functionality to the "-" button.

3. Use the already specified "useReducer" hook to add the button functionality and save both the current Date and Vaccination Information of the people fetched from the API.
   NOTE: if you are not familiar with useReducer hook, then you can switch to a different implementation.

4. Pass the current_date and person_vaccine_info data fetched from the API to the Button.js, PieChart.js and Table.js component to display relevant info.

5. Update the summary sentence below the buttons which says “X out of Y people have been vaccinated”.
   Such that,
   “Y” = total number of people in the vaccine_dates.json file
   “X” = number of people who have been vaccinated (vaccine date <= displayed current date)

6. Consume the Context in the "Context.js" file and use the context value to update the color of the Pie Chart and Update pie chart to display the no. of people who have and have not been vaccinated.
   NOTE: Skip this step if you're not comfortable with useContextHook.

7. Show a table of users with 3 columns, “Name”, "Vaccination Date" and “Vaccination Status”
   The Vaccination Status should say “Vaccine Done” in GREEN COLOR if vaccination date <= displayed current date
   The Vaccination Status should say “Vaccine Pending” in RED COLOR if vaccination date > displayed current date

## What's Already Been Done 🏁

1. Basic app UI
2. Created the main required variables
3. Basic component are created
4. Data is provided in 'public/data' folder. This should be fetched, and should not be edited.

-> When the date changes, the summary, pie chart and table should all get updated.
-> Please add whatever components and styling you need.
-> Grading criteria: Correctness, functionality, code quality, styling/alignment/formatting
-> Submit the solution without the "node_modules" folder.
