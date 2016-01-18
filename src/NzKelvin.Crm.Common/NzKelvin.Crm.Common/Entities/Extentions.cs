using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NzKelvin.Crm.Common.Entities
{
    public static class Extentions
    {
        /// <summary>
        /// Recommended to use this method to merge a from a pre-image to a target image 
        /// in order to produce a post-image.
        /// </summary>
        /// <param name="imageEntity"></param>
        /// <param name="targetEntity"></param>
        /// <returns></returns>
        public static Entity MergeWith(this Entity imageEntity, Entity targetEntity)
        {
            var targetClone = targetEntity.Clone(false); // false - not include related entities.

            foreach(var attr in imageEntity.Attributes){
                var attrKey = attr.Key;
                if (!targetClone.Contains(attrKey))
                {
                    targetClone.Attributes[attrKey] = attr.Value;
                }
            }

            return targetClone;
        }
    }
}
