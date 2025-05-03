exports.getUserProfile = async (req, res) => {
    res.json(req.user);
  };
  
  exports.updateUserProfile = async (req, res) => {
    const { username, email, password } = req.body;
  
    if (username) req.user.username = username;
    if (email) req.user.email = email;
    if (password) req.user.password = await bcrypt.hash(password, 10);
  
    await req.user.save();
    res.json({ message: "Profile updated" });
  };
  