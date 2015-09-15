using System;
namespace CrmSvcUtilExtensions.Config
{
    public interface IConfigurationHelper
    {
        T GetSection<T>() where T : class;
        T GetSection<T>(string sectionName) where T : class;
    }
}
