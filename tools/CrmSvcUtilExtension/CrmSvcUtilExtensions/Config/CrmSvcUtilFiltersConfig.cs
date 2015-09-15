using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using CrmSvcUtilExtensions.Helpers;

namespace CrmSvcUtilExtensions.Config
{
    [XmlRoot(Constants.CONFIG_SECTION_NAME_CRMSVCUTILFILTERS)]
    public class CrmSvcUtilFiltersConfig
    {
        [XmlElement("entities")]
        public EntitiesFilter Entities { get; set; }

        [XmlElement("optionsets")]
        public OptionSetsFilter OptionSets { get; set; }
    }
}
