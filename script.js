// Code goes here

var demo = angular.module('demo', []);

demo.controller('DemoCtrl', function($scope, $timeout, $interval){
  //初始化
  $scope.inputForbidden = false; //手机号可输入
  $scope.showInfo = false; //等待时间错误提示显示控制
  $scope.sendBtn = false; //控制发送按钮是否禁用
  $scope.timeout = 60000;//等待时间，默认为60s
  $scope.timerCount = $scope.timeout / 1000; //毫秒转换为秒
  $scope.alertInfo = "获取验证码"; //按钮未点击文本

  //判断时间配置输入格式是否正确
  $scope.checkTime = function(){
    var reg =/^[1-9]\d*$/;
    if(!reg.test($scope.wTime)){
      $scope.showInfo = true;
      $scope.textInfo ="请输入数字";
    }else{
      $scope.showInfo = false;
      $scope.timeout = $scope.wTime *1000; //用户输入秒数转化为毫秒数
      $scope.timerCount = $scope.timeout / 1000;
    } 
     
  }

  //根据输入情况判断按钮状态
  $scope.controlBtn = function(){
    if(!!$scope.phone){
      $scope.alertInfo = "获取验证码";
      $scope.sendBtn=false;
    }
  }

  //发送短信验证码
  $scope.sendRequest = function(){
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!!$scope.phone){
       if(!reg.test($scope.phone)){
          $scope.alertInfo="手机号不合法";
          $scope.sendBtn=true;
      }else{
        $scope.sendBtn=false;
        $scope.showTimer = true;
        $scope.sendBtn = true;
        $scope.alertInfo = "秒后可重新点击发送，请耐心等待";
        $scope.inputForbidden = true;
        //设置倒计时
        var counter = $interval(function(){
          $scope.timerCount = $scope.timerCount - 1;
        }, 1000);
        //在经过等待时间后按钮reset
        $timeout(function(){
          $scope.alertInfo = "获取验证码";
          $scope.sendBtn = false;
          $interval.cancel(counter);
          $scope.showTimer = false;
          $scope.timerCount = $scope.timeout / 1000;
          $scope.inputForbidden = false;
        }, $scope.timeout);
      }
    }else{
       $scope.alertInfo = "手机号为空";
       $scope.sendBtn = true;
    }
  }

    
});
