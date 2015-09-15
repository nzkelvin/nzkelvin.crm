using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace CrmSvcUtilExtensions.Config
{
    public class ConfigurationHelper : IConfigurationHelper
    {
        public T GetSection<T>(string sectionName) where T: class
        {
            var section = ConfigurationManager.GetSection(sectionName) as XmlNode;

            if (section == null)
                return null;

            var serializer = new XmlSerializer(typeof(T));
            return serializer.Deserialize(new StringReader(section.OuterXml)) as T;
        }

        public T GetSection<T>() where T : class
        {
            return GetSection<T>(typeof(T).Name);
        }
    }
}
