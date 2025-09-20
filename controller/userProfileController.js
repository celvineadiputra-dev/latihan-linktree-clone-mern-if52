export const userProfile = (req, res) => {
  const userProfileId = req.params.user_profile_id;

  res.render('index', {
    user: {
      id: userProfileId,
      username: 'Celvine123',
      name: 'Celvine',
      profilePicture: 'https://avatar.iran.liara.run/public/13',
      icon : 'bi-youtube'
    },
  });
};
