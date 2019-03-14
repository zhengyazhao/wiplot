
import { ConfigModel } from '../../domain/configModel';
import { userContract } from '../../contract/userContract';
import { Observable ,of} from 'rxjs';

import{WipContract}from '../../contract/WipContract';
import { ajaxOption, HttpAccessor } from 'element-angular/wiplot/src/app/lib/network/httpAccessor';
/**
 * 卡夹数据访问 date：2019年3月13日11:01:08
 */
export class LoginService {

    //api的地址
    private webApiUrl: string = '';
    //配置信息实体
    private configModel:ConfigModel=new ConfigModel();
    //构造函数
    constructor() {
        this.webApiUrl = this.configModel.serviceUrl;
    }

    /**
     * 用户登录
     */
    public login(user: userContract): Observable<WipContract<string>>{
      let option:ajaxOption={
         url:this.webApiUrl+'/api/user/login',
         data:user,
         type: "post",        
      };
      return HttpAccessor.ajax(option);
    }
}