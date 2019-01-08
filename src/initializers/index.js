exports.run = (store) => {

    const initializers = [
        require('./auth'),
        require('./mqtt')
    ];

    initializers.forEach((init) => init(store));
};
