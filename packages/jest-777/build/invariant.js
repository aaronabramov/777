'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = 

invariant;function invariant(
assertion) 

{var message = arguments.length <= 1 || arguments[1] === undefined ? 'Invariant violation' : arguments[1];
  if (!assertion) {
    throw new Error(message);}}