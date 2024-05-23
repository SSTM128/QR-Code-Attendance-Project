const app = require('./app');
const IP_ADDRESS = '192.168.1.39'; // Your local IP address
const PORT = 3000;

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on http://${IP_ADDRESS}:${PORT}`);
});