'use strict';

// Configure chai & sinon
global.expect = require('chai')
    .use(require('chai-string'))
    .use(require('chai-as-promised'))
    .use(require('expect-to-be-a-promise'))
    .expect;