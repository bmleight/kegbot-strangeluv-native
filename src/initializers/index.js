exports.run = (store) => {

    const initializers = [
        require('./auth'),
        require('./mqtt'),
        require('./kegbot')
        // require('./face')
    ];

    initializers.forEach((init) => init(store));
};
