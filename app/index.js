import 'angular-material/angular-material.css';
import angular from 'angular'
import ngMaterial from 'angular-material';
import ngSanitize from 'angular-sanitize';
import * as _ from "lodash";
import AppController from './app.controller';

export default angular.module('app', ['ngMaterial', ngSanitize])
    .controller('AppController', AppController)
    .config(($qProvider, $compileProvider) => {
        "ngInject";
        $qProvider.errorOnUnhandledRejections(false);
        $compileProvider.debugInfoEnabled(false);
    })
    .constant(_, window._)
    .run(($rootScope) => {
        "ngInject";
        $rootScope._ = window._;
    });
