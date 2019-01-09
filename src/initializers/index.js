exports.run = (store) => {

    const initializers = [
        require('./auth'),
        require('./mqtt'),
        require('./kegbot')
    ];

    initializers.forEach((init) => init(store));
};
