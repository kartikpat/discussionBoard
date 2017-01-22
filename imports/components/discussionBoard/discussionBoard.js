
//Main Module and Controller

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './discussionBoard.html';
import { name as LoginCtrl } from '../login/login';
import { name as CommentsCtrl } from '../comments/comments';
 
class DiscussionBoard {}
 
const name = 'discussionBoard';
 
// create discussionBoard module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  LoginCtrl,
  CommentsCtrl
]).component(name, {
  template,
  controllerAs: name,
  controller: DiscussionBoard
})
  .config(config)
  .run(run);

// Function to redirect to login page if any URL is typed
function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

}

// Function to redirect to login page if user is not loggedIn
function run($rootScope, $state) {
  'ngInject';
 
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    }
  );
}