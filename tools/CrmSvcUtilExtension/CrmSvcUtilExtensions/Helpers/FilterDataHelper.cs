using CrmSvcUtilExtensions.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CrmSvcUtilExtensions.Helpers
{
    public class FilterDataHelper
    {
        public CrmSvcUtilFiltersConfig LoadFilterData()
        {
            IConfigurationHelper configHelper = new ConfigurationHelper();
            return configHelper.GetSection<CrmSvcUtilFiltersConfig>(Constants.CONFIG_SECTION_NAME_CRMSVCUTILFILTERS);
        }
    }
}
