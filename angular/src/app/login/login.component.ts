import { Component, OnInit } from '@angular/core';
import { ElMessageService } from 'element-angular';
import { Router } from '@angular/router';
import { utilities } from '../lib/common/utilities';
import { ConfigModel } from '../domain/configModel';
import { ajaxOption, HttpAccessor } from '../lib/network/httpAccessor';
import {LoginService} from '../services/login/login.service';
import {userContract} from '../contract/userContract';
import{HttpCodeEnum} from '../domain/enum/HttpCodeEnum';
@Component({
  selector: 'wip_login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
  hero = 'Windstorm';
  */

  userName = "";
  userPass = "";
  
  //卡夹服务
  private loginService:LoginService;
  private userContract:userContract=new userContract();
  constructor(private configModel: ConfigModel, private message: ElMessageService, private Router: Router) {

  }
  //点击确认按钮
  ngOnInit() {
    this.loginService=new LoginService();
  }

  loginText = "登录";//登录按钮

  onLogin() {
    this.loginText = '登录中...';
    if (utilities.strIsEmptyOrNull(this.userName) || utilities.strIsEmptyOrNull(this.userPass)) {
      this.message.error("请输入用户名或密码");
      this.loginText = "登录";
      return;
    }

  
    this.userContract.userName=this.userName;
    this.userContract.userPwd=this.userPass;
    this.loginService.login(this.userContract).subscribe({ next: (val) => {
          if (val.HttpCode == HttpCodeEnum.serviceError) {
            this.message.error(val.msg);
            return;
          }
          if (val.HttpCode == HttpCodeEnum.error) {
            this.message.error(val.msg);
  
          }
          if (val.HttpCode == HttpCodeEnum.success) {
            this.message.success(val.msg);
            this.Router.navigateByUrl("main");
          }
        },
        error: (err) => {
          this.loginText = "登录";
          this.message.error("登录失败");
          return;
        }, complete: () => {
          this.loginText = '登录';
  
        }}
    );
    // let parms = {
    //   UserName: this.userName,
    //   UserPwd: this.userPass,
    // };
    // let option: ajaxOption = {
    //   url: this.configModel.serviceUrl + 'api/user/login',

    //   type: "post",

    //   data: parms,

    // };

    // HttpAccessor.ajax(option).subscribe({
    //   next: (val) => {
    //     if (val.HttpCode == 500) {
    //       this.message.error(val.msg);
    //       return;
    //     }
    //     if (val.HttpCode == 400) {
    //       this.message.error(val.msg);

    //     }
    //     if (val.HttpCode == 200) {
    //       this.message.success(val.msg);
    //       this.Router.navigateByUrl("main");
    //     }
    //   },
    //   error: (err) => {
    //     this.loginText = "登录";
    //     this.message.error("登录失败");
    //     return;
    //   }, complete: () => {
    //     this.loginText = '登录';

    //   }
    // });

  }


 
}
