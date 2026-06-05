const jwt = require('jsonwebtoken');

/**
 * Generates a signed JSON Web Token (JWT) containing the user ID as payload.
 * Uses the JWT_SECRET from environmental variables.
 * Expiry is set to 1 day.
 * 
 * @param {string} id - The MongoDB User ID
 * @returns {string} - The generated JWT string
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;
