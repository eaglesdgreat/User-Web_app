const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3060,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    mongoUri: process.env.MOMGODB_URI || 'mongodb://localhost:27017/store'
}

export default config