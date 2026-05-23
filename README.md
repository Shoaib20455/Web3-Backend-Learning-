# MongoDB Tutorial - Web3 Backend

A Node.js + Express backend API for managing Web3 wallets, NFTs, transactions, and user authentication using MongoDB and Mongoose.

## 📋 Project Overview

This project demonstrates a complete Web3 backend implementation with:
- **User Management**: User authentication with JWT tokens and password hashing
- **Wallet Management**: CRUD operations for managing blockchain wallets
- **Transaction Tracking**: Track NFTs and blockchain transactions
- **Security**: JWT-based authentication middleware

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.6.2)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Security**: bcryptjs (v3.0.3)
- **Environment**: dotenv (v17.4.2)

## 📁 Project Structure

```
mongodb_tutorial/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and project metadata
├── .env                   # Environment variables (create before running)
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User schema with password hashing
│   ├── Wallet.js          # Wallet schema with blockchain networks
│   ├── NFT.js             # NFT model
│   ├── Transaction.js     # Transaction model
│   └── wallet.js          # Additional wallet configuration
└── routes/
    ├── wallet.js          # Wallet CRUD endpoints
    └── auth.js            # Authentication endpoints
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd mongodb_tutorial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?appName=Cluster0
   PORT=5000
   JWT_SECRET=your_secret_key_here
   ```

   - **MONGODB_URI**: Your MongoDB connection string (get from MongoDB Atlas)
   - **PORT**: Server port (default: 5000)
   - **JWT_SECRET**: Secret key for JWT token signing (use a strong, random string)

4. **Start the server**
   ```bash
   node app.js
   ```

   You should see:
   ```
   ✅ MongoDB connected!
   Server port 5000 pe chal raha hai
   ```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

### Health Check
- **GET** `/`
  - Response: `{ "message": "Web3 Backend chal raha hai!" }`

### Wallet Management

#### Create a Wallet
```bash
POST /wallets
Content-Type: application/json

{
  "address": "0x742d35Cc6634C0532925a3b844Bc2e7595f72e50",
  "network": "ethereum"
}
```

#### Get All Wallets
```bash
GET /wallets
```

#### Get Wallet by Address
```bash
GET /wallets/0x742d35Cc6634C0532925a3b844Bc2e7595f72e50
```

#### Update Wallet Balance
```bash
PUT /wallets/0x742d35Cc6634C0532925a3b844Bc2e7595f72e50
Content-Type: application/json

{
  "balance": "1000000000000000000"
}
```

#### Delete a Wallet
```bash
DELETE /wallets/0x742d35Cc6634C0532925a3b844Bc2e7595f72e50
```

## 🔐 Authentication

The project includes JWT-based authentication via the `protect` middleware.

To use protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Models

### User Model
- `email` (String, required, unique)
- `password` (String, required, hashed with bcryptjs)
- `wallet` (Reference to Wallet model)
- `timestamps` (createdAt, updatedAt)

### Wallet Model
- `address` (String, required, unique, lowercase)
- `network` (String, enum: ethereum, solana, polygon)
- `balance` (String, default: "0")
- `timestamps` (createdAt, updatedAt)

### NFT Model
- (See models/NFT.js for schema details)

### Transaction Model
- (See models/Transaction.js for schema details)

## 🧪 Testing the API

### Using cURL
```bash
# Create a wallet
curl -X POST http://localhost:5000/wallets \
  -H "Content-Type: application/json" \
  -d '{"address":"0x742d35Cc6634C0532925a3b844Bc2e7595f72e50","network":"ethereum"}'

# Get all wallets
curl http://localhost:5000/wallets

# Get specific wallet
curl http://localhost:5000/wallets/0x742d35Cc6634C0532925a3b844Bc2e7595f72e50

# Update wallet
curl -X PUT http://localhost:5000/wallets/0x742d35Cc6634C0532925a3b844Bc2e7595f72e50 \
  -H "Content-Type: application/json" \
  -d '{"balance":"5000000000000000000"}'

# Delete wallet
curl -X DELETE http://localhost:5000/wallets/0x742d35Cc6634C0532925a3b844Bc2e7595f72e50
```

### Using Postman
1. Import the API endpoints into Postman
2. Set up environment variables for base URL
3. Test each endpoint with appropriate request methods and payloads

## 🔧 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/?appName=Cluster0` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_123` |

## 📝 Key Features

- ✅ **User Authentication**: Secure password hashing with bcryptjs
- ✅ **JWT Tokens**: Token-based API authentication
- ✅ **CRUD Operations**: Complete wallet management
- ✅ **MongoDB Integration**: Mongoose ODM for database operations
- ✅ **Error Handling**: Comprehensive error messages and status codes
- ✅ **Data Validation**: Schema validation with Mongoose

## ⚠️ Security Considerations

1. **Never commit `.env` file** to version control
2. **Use strong JWT_SECRET** - generate a random, complex string
3. **Keep credentials private** - don't share MongoDB URI or JWT secret
4. **Validate inputs** - implement additional validation as needed
5. **Use HTTPS** in production

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Verify MongoDB URI in `.env` file
- Check MongoDB Atlas IP whitelist (add your IP)
- Ensure MongoDB cluster is active

### Port Already in Use
- Change `PORT` in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

### Invalid Token Error
- Ensure JWT_SECRET in `.env` matches the one used for token signing
- Check token format: `Authorization: Bearer <token>`

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [JWT Documentation](https://jwt.io/)

## 📄 License

ISC

## 👤 Author

MongoDB Tutorial Project

---

**Happy Coding!** 🚀
