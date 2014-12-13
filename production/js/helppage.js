requirejs([
    'modernizr',
    'jquery',
    'menuController',
    'tabController',
    'subpageController',
    'cardController',
    'loginController',
    'PasswordController',
    'UpScrollController',
    'feedbackController'
  ],function(
    modernizr, 
    jquery, 
    menuController, 
    tabController,
    subpageController,
    cardController,
    loginController,
    PasswordController,
    UpScrollController,
    feedbackController
  ){
  $(document).ready(function(){
    new menuController();
    var tabs = $('.tab-widget'),
        index = tabs.length;
    while(index--){
        new tabController(tabs[index]);
    }
    new feedbackController();
    new cardController();
    new loginController();
    new UpScrollController();
    new PasswordController();
  });
});