const inviteCode = (req, res, next) => {
  const { inviteCode } = req.body
  if (inviteCode !== process.env.INVITE_CODE) {
    res.status(401).json({ error: 'incorrect invite code' })
  } else {
    next()
  }
}

module.exports = inviteCode
