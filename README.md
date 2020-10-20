# Shopping-Cart

To run:
 - Both the web-api and the web-app will be need to be running for the application to function as expected.
 - NPM install will be required to be ran to install the dependencies for the front end application.
 - A full rebuild of the .NET Api will be required for it to run. With the API, it may change the local https host per machine. If it does, it will need to be changed to run on port: 44358.
 
Objectives:
 - Add Items - Done - Can be seen on the main home page
 - Remove Items - Done - Can be seen in the drop down top right and the checkout page
 - Clear Items - Done - Can be seen in the checkout page
 - Calculate Total - Done - Can be seen in the checkout page
 - Apply Discount Codes on Items - Done - Can be seen in the checkout page, and on the items 'I am your farther' and 'Kit Kat'
 
Know Issues (Ran out of time):
 - You need to manually remove the /checkout from the url to return the home page.
 - When adding multiple items that are the same, they should stack but instead it adds another instance of the item and when an instance is removed every instance with the same ID will be removed. 
 - When an order has been processed and is a success it should redirect back to the home page. 
 
Missing:
- Unit and Intergration Tests
