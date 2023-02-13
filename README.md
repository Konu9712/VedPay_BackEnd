# VedPay Backend

VedPay is a wallet application that allows users to save multiple cards and make transactions with those cards. This repository contains the backend code for VedPay, built with Node.js and Express.js.

## Requirements
- Node.js
- Express.js
- MongoDB

## Getting Started

1. Clone this repository to your local machine:
$git clone https://github.com/Konu9712/VedPay_BackEnd.git
2. Install the dependencies:
$npm install
3. Start the server:
$ npm start
## API Endpoints
Signup API: {{domain}}/api/auth/signup

Login API: {{domain}}/api/auth/login

Total Balance API: {{domain}}/api/auth/:id/totalBalance

Add Card API: {{domain}}/api/card/:id/addCard

Card List API: {{domain}}/api/card/:id/cardList

Delete Card API: {{domain}}/api/card/:id/deleteCard/:cardId

Load Money API: {{domain}}/api/in/:id/inMoney/:transactionId

All User Contact API: {{domain}}/api/contact/:id/allUserContact

Send Money API: {{domain}}/api/out/:id/outMoney/wallet

History API: {{domain}}/api/transaction/:id/contact/:contactNumber

Global Transaction API: {{domain}}/api/transaction/:id/global

Card Transaction API: {{domain}}/api/transaction/:id/card/:cardId

Test API: {{domain}}/api/auth/test

## Contributing

Contributions are welcome. Please open a pull request and make sure to follow the existing coding style.
