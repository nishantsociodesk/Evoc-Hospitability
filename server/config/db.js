// import mongoose from 'mongoose';

// let isConnected = false;
let isConnected = false;

// export const connectDB = async () => {
export const connectDB = async () => {
	isConnected = false;
	console.info('MongoDB disabled. Using local JSON storage for bookings.');
	return false;
};
  
//   try {
//     const conn = await mongoose.connect(uri, {
//       serverSelectionTimeoutMS: 2500, // Quick timeout to fallback gracefully if no local mongo daemon
//     });
//     isConnected = true;
//     console.log(`✓ MongoDB Connected successfully to: ${conn.connection.host}`);
//     return true;
//   } catch (error) {
//     isConnected = false;
//     console.warn(`! MongoDB direct connection failed (${error.message}).`);
//     console.info(`✓ Activating resilient local storage layer for live demo & development.`);
//     console.info(`  (You can connect to MongoDB Atlas anytime by setting MONGODB_URI in server/.env)`);
//     return false;
//   }
// };

// export const getDbStatus = () => isConnected;
export const getDbStatus = () => isConnected;
