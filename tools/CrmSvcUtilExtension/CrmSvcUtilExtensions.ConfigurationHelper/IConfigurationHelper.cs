using System;
namespace CrmSvcUtilExtensions.ConfigurationHelper
{
    public interface IConfigurationHelper
    {
        T GetSection<T>() where T : class;
        T GetSection<T>(string sectionName) where T : class;
    }
}
