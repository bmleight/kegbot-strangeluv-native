const Client = require('../utils/mqtt-client');
const { Message } = require('react-native-paho-mqtt');

module.exports = (store) => {

    const sendVelocity = () => {

        const state = store.getState();

        const x = state.kegbot.velocityX;
        const y = state.kegbot.velocityY;

        const message = new Message(JSON.stringify({ left: x, right: y }));
        message.destinationName = 'hackbot/drive';

        Client.send(message);

        // console.warn(x, y);
        setTimeout(sendVelocity, 100);
    };

    setTimeout(sendVelocity, 1000);
};
