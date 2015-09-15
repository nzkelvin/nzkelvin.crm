using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace CrmSvcUtilExtensions.Config
{
    public class OptionSetsFilter
    {
        [XmlElement("optionset")]
        public string[] OptionSet { get; set; }
    }
}
