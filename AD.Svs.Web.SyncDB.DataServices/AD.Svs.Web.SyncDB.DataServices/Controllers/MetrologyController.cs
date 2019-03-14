using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using AD.Svs.Web.SyncDB.DataServices.Data;
using AD.Svs.Web.SyncDB.DataServices.Models.DataTables;
using AD.Svs.Web.SyncDB.DataServices.Extensions;
using NLog;
using AD.Svs.Web.SyncDB.DataServices.Common;

using AD.Svs.Web.SyncDB.DataServices.Models;

namespace AD.Svs.Web.SyncDB.DataServices.Controllers
{
    public class MetrologyController : ApiController
    {
        private ISyncDBEngineeringDataRepo syncDBEngineeringDataRepo;
        private Logger logger = LogManager.GetCurrentClassLogger();
        public MetrologyController()
        {
            this.syncDBEngineeringDataRepo = new SyncDBEngineeringDataRepo(new SyncDBEngineeringData_R());
        }

        [HttpPost]
        [Route("api/Metrology/PrismData")]
        public DataTableResponse PrismData([FromBody] DataTableRequest request)
        {
            try
            {
                IQueryable<iv_prism> data = syncDBEngineeringDataRepo.GetPrismData();
                List<DataTableSearchColumn> searchCols = new List<DataTableSearchColumn>();
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.DateTime, Name = "TestDate" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "step" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "wafer" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "cell" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "owner" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "flow" });
                long recordCount;
                var pagedData = data.GetPagedData<iv_prism>(request, searchCols, out recordCount);
                return new DataTableResponse
                {
                    draw = request.Draw,
                    recordsTotal = recordCount,
                    recordsFiltered = recordCount,
                    data = pagedData.ToArray(),
                    error = ""
                };
            }
            catch (Exception ex)
            {
                logger.Error(ex);
                throw;
            }

        }

        [HttpPost]
        [Route("api/Metrology/RelAnalysisData")]
        public DataTableResponse RelData([FromBody] DataTableRequest request)
        {
            try
            {
                IQueryable<iv_rel> data = syncDBEngineeringDataRepo.GetRelData();
                List<DataTableSearchColumn> searchCols = new List<DataTableSearchColumn>();
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.DateTime, Name = "rel_date" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "step" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "wafer" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "cell" });
                long recordCount;
                var pagedData = data.GetPagedData<iv_rel>(request, searchCols, out recordCount);
                return new DataTableResponse
                {
                    draw = request.Draw,
                    recordsTotal = recordCount,
                    recordsFiltered = recordCount,
                    data = pagedData.ToArray(),
                    error = ""
                };
            }
            catch (Exception ex)
            {
                logger.Error(ex);
                throw;
            }
        }

        [HttpPost]
        [Route("api/Metrology/HiPotTestData")]
        public DataTableResponse HiPotTestData([FromBody] DataTableRequest request)
        {
            try
            {
                IQueryable<HiPotTest> data = syncDBEngineeringDataRepo.GetHiPotTestData();
                List<DataTableSearchColumn> searchCols = new List<DataTableSearchColumn>();
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.DateTime, Name = "UnitIdentifier" });
                searchCols.Add(new DataTableSearchColumn() { DataType = TypeCode.String, Name = "Hipot_DateTime" });
                long recordCount;
                var pagedData = data.GetPagedData<HiPotTest>(request, searchCols, out recordCount);
                return new DataTableResponse
                {
                    draw = request.Draw,
                    recordsTotal = recordCount,
                    recordsFiltered = recordCount,
                    data = pagedData.ToArray(),
                    error = ""
                };
            }
            catch (Exception ex)
            {
                logger.Error(ex);
                throw;
            }
        }
        [HttpPost]
        [Route("api/user/login")]
        public DataTableResponse userLogin(Newtonsoft.Json.Linq.JObject obj)
        {
            DataTableResponse msg = new DataTableResponse();

            UserModel userModel = Newtonsoft.Json.JsonConvert.DeserializeObject<UserModel>(Convert.ToString(obj));
            try
            {

                if (!string.IsNullOrWhiteSpace(userModel.UserName) && !string.IsNullOrWhiteSpace(userModel.UserPwd))
                {
                    msg.msg = "用户名密码不能为空";
                    msg.HttpCode = 500;
                }

                if (userModel.UserName.Equals("111") && userModel.UserPwd.Equals("111"))
                {
                    msg.msg = "登录成功!";
                    msg.HttpCode = 200;
                }
                else
                {
                    msg.HttpCode = 400;
                    msg.msg = "账号密码错误!";
                }

            }
            catch (Exception ex)
            {
                throw;
            }
            return msg;
        }
        [HttpGet]
        [Route("api/user/list")]
        public DataTableResponse userList([FromUri]UserModel model)
        {
            DataTableResponse data = new DataTableResponse();
            try
            {
                List<UserModel> userModelList = new List<UserModel>();

                Random r = new Random();

                int page = model.page.GetValueOrDefault();
                int size = model.pageSize.GetValueOrDefault();
                if (page <= 0)
                {
                    page = 1;
                }  
                for ( int i= 0; i <= 9; i++)
                {
                  int s=  r.Next(1,100);
                    UserModel userModel = new UserModel();
                    userModel.departmentSeq = s;
                    userModel.email = "邮箱:" + s;
                    userModel.UserName = "测试人员" + s;
                    userModel.gender = s % 2 == 0 ? "男" : "女";
                    userModel.jobtitle = "职称:" + s;
                    userModel.language = "语言:" + s;
                    userModel.mobile = "用户i手机开头:" + s + "31";
                    
                    userModel.pro = s;
                    userModel.remark = "测试fff";
                    userModelList.Add(userModel);
                }
                data.HttpCode = 200;
               
                int total = r.Next(20,100);
                data.total = total;
             
                data.data = userModelList.ToArray();
            }
            catch (Exception ex)
            { }
            return data;

        }
    }
}
