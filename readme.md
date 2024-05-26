# <p align="center">Bidding Application</p>

A real time Auction Application.



# Tech Stacks:
#####  Express.js  |  MySql  |  Node.js | Socket.io
   
# Features
  - [x] Register, Login
   - [x] Create new Bid item
   - [x] Search and filter Bid items
   - [x] Update, delete Bid items
   - [x] Place you bid
   - [x] Roll based access control
   - [x] get notification
   

   
   ## Signup
    #### Where a new user comes, He has to  register, bcrypt is used to encode his password.

   ## Login 
    #### A register user has to login, for that bcrypt is used to decode the password and compare with original password and email is compared if true then two token is 
     generated first normal token and second refresh_token that are saved in cookie storage.
   

  
   ## Auction Items
     Get by page_no filter and search for any auction item, 
     Get auction item by id.
     Post upload your auction item for that formdata is used. Image is uploaded by user handled in server using multer and therefore send to imgbb server to convert image to live url, remaining info is extracted from request body and saved it in sql database.
     Put Update auction item, only owner and admin can update any auction item.
     Delete auction item, only owner and admin can delete any auction item.
     

  ## Bids
     Bid on any item will be saved in the database.
     User can also get list of bids on any particular item.

  ## Auction
     Get Auction List
     Mark any auction as read.

  There is also the functinality of live bid notification when a new bid the turned by any person through socket.io.

