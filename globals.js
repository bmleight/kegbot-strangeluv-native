// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';

// Custom overrides for Web Client (src/utils/web-client) configuration
// Match to settings of API server you're hitting
//
// For example,
// global.process.env.API_HOST = 'http://localhost:4000';
// global.process.env.API_PREFIX = '/api';

// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
    protocol: 'file:'
};
