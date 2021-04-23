# Auto show

## Context of the project
Tomorrow Cars is asking you to create a web application for them for their upcoming auto show. To meet the need, you have to create a web application using Node.Js / Express Js / Mongo DB in the backend and ReactJs in the frontend,

In short, the auto show will go as follows:

• The arrival of the owners of the cars.

• Registration of owners via the application

• Position vehicles in the reserved corners.

• The arrival of customers.

• Customer registration via the application.

• Car test request (each customer has the right to test a vehicle only once, and the maximum number of vehicle tested by someone is 10)

• If a customer is interested in a car, he can negotiate the price and if both parties agree, a deposit of the reservation check by the customer must be made.

An owner is made up of (Unique identifier, CIN, First name, Last name, E-mail, Bank account details, Telephone, Cars to show [one or more], Place number [one or more]) A customer is made up of (Unique identifier , CIN, First name, Last name, E-mail, Phone, Total number of tests) A car has (Unique identifier, Number, Name, Make, Color, Price, Fuel, an attribute [est_soldé] indicates what the car is available or not) The operation of reserving a car is represented by an entity (Reserve_car) contains (car id, customer id, owner id, amount deposited, reduction rate),

Backend Architecture (Creation of an API):

The actors of the application are (the customer and the owner)
Try to follow the architecture of the folders declared in the resources.
You must respect the MVC architecture during the realization of your project,
Please note that field validations are mandatory (backend and frontend side)
The actions of the application must be traced using a log file
Schema of database collections in resources.
Archi (Front end): Consumption of the ReactJs API After the realization of the API, it must be consumed using (fetch or Axios ...), the choice is free, then you must build the interfaces necessary to achieve the goal.

In addition to this, you need to know more about it.

Test plan:

Add a class of unit tests using (Mocha or chai or jasmine or supertest ...) to test the following functionalities:
* registration of an owner,
* client authentication
* the reservation of a car.
Pedagogical modalities
Individual work,