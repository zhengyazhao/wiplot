using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AD.Svs.Web.SyncDB.DataServices.Models
{
   
    public class UserModel
    {
        public  string UserName { get; set; }
        public string UserPwd { get; set; }

   
        /// <summary>
        /// 用户代码
        /// </summary>
      
        public string userId { get; set; }

     
        /// <summary>
        /// 性别
        /// </summary>

        public string gender { get; set; }

        /// <summary>
        /// 密码
        /// </summary>

        public string password { get; set; }

        /// <summary>
        /// 部门
        /// </summary>

        public long? departmentSeq { get; set; }

        /// <summary>
        /// 职称
        /// </summary>

        public string jobtitle { get; set; }

        /// <summary>
        /// 邮箱
        /// </summary>
   
        public string email { get; set; }


        public string phone { get; set; }

        public string mobile { get; set; }

        public string wechat { get; set; }

        public string remark { get; set; }

        public string language { get; set; }

  
        public string skin { get; set; }
      
        public string photo { get; set; }
      
        public bool isFirstLogin { get; set; }
        /// <summary>
        /// 进度
        /// </summary>
        public int? pro { get; set; }

        public int? page { get; set; }

        public  int? pageSize { get; set; }

        public  int? total { get; set; }
    }
}