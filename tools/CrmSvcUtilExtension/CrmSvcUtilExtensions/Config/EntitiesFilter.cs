using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace CrmSvcUtilExtensions.Config
{
    public class EntitiesFilter
    {
        [XmlElement("entity")]
        public string[] Entity { get; set; }
    }
}
