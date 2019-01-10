const Client = require('../utils/mqtt-client');
const { Message } = require('react-native-paho-mqtt');

module.exports = (store) => {

    const sendVelocity = () => {

        const state = store.getState();

        // x,y => left,right conversion adapted from http://home.kendra.com/mauser/Joystick.html

        // Get X and Y from the Joystick, do whatever scaling and calibrating you need to do based on your hardware.
        // Invert X
        const x = state.kegbot.velocityX;
        const y = state.kegbot.velocityY * -1;

        // Calculate R+L (Call it V): V =(100-ABS(X)) * (Y/100) + Y
        const v = (100 - Math.abs(x)) * (y / 100) + y;

        // Calculate R-L (Call it W): W= (100-ABS(Y)) * (X/100) + X
        const w = (100 - Math.abs(y)) * (x / 100) * x;

        // Calculate R: R = (V+W) /2
        const right = (v + w) / 2;

        // Calculate L: L= (V-W)/2
        const left = (v - w) / 2;

        // Do any scaling on R and L your hardware may require.
        // Send those values to your Robot.
        // Go back to 1.

        const message = new Message(JSON.stringify({ left, right }));
        message.destinationName = 'hackbot/drive';

        Client.send(message);

        // console.warn(x, y);
        setTimeout(sendVelocity, 100);
    };

    setTimeout(sendVelocity, 1000);
};
