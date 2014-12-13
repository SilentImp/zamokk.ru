requirejs([
    'modernizr',
    'jquery',
    'menuController',
    'cardController',
    'loginController',
    'PasswordController',
    'UpScrollController'
  ],function(
    modernizr, 
    jquery, 
    menuController, 
    cardController,
    loginController,
    PasswordController,
    UpScrollController
  ){
  $(document).ready(function(){
    new menuController();
    new cardController();
    new loginController();
    new UpScrollController();
    new PasswordController();
  });
});