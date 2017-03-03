# instock-native - a kitchen inventory and shopping list app


This app is my TodoMVC while I dig into react-native.

##Overview / Notes
 * Two sections - Inventory and ShoppingList
 * Firebase is used for the data and authentication
 * I focused on web and android because I don't have any iOS devices to test on

##Changes to come...
 * I will add headers that filter the ListView components onPress
 * There is a limit to the number of items rendered, so I will dig into the react-native docs and fix that

##Things I would do for this if I had time...
 * Add a cancel button to the delete mode/menu
 * When you start editing something and close and reopen the app - if you then save changes without modifying your entry the db saves the placeholder text
 * Remove any unused, commented code and unneeded console.logging, etc
 * I would like to add a feature that searches the internet for recipes based on what we have "in stock"
 * I didn't focus on performance or leveraging as many of the lifecycle methods as I should have
