// function to send jwt token
const sendJwtToken = async (user, statusCode, res) => {
  // call getJwt token method
  const token = await user.getJwtToken();

  // cookie option
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIES_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // return response
  res.status(statusCode).cookie("jwtToken", token, options).json({
    success: true,
    jwtToken: token,
    user,
  });
};

// export function
module.exports = sendJwtToken;
