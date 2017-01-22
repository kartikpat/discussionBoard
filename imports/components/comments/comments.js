import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './comments.html';
import { Comments } from '../../api/comments';

// Controller logic for adding comments 
class CommentsCtrl {

	constructor($scope, $reactive,$state) {
    'ngInject';
     
    $reactive(this).attach($scope);
    this.$state = $state;
    this.comment = {};
    this.subscribe('comments');
    this.helpers({
      // Method to return all Comments in Sorted Order
      comments() {
        return Comments.find({}, {sort: {created: -1}});
      }
    });
  }
  
  // Submit user comments in a feed
  submit() {
    this.comment = {
      text : this.comment.text,
      email : document.email,
      created: new Date()
    };
    // Insert comments
    Comments.insert(this.comment);
    this.reset();
  }

  // Method to logout and redirect to login page
  logout() {
     document.email = 'undefined';
     this.$state.go('login');
  }
  
  // Reset form fields
  reset() {
    this.comment = {};
  }
   
}



const name = 'comments';

// create comments module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: CommentsCtrl
  })
    .config(config);

function config($stateProvider) {
  'ngInject';
$stateProvider
    .state('comments', {
      url: '/comments',
      template: '<comments></comments>',
       resolve: {  
       // Prevent user access to Discussion Board without logging in and redirect to login page                                      
       currentUser($q) {
        if (typeof document.email === 'undefined') {
          window.alert("LOGIN FIRST!!");
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
   });
}