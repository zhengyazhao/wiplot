using System;
using System.Reflection;

namespace AD.Svs.Web.SyncDB.DataServices.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}