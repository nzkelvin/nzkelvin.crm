using System;
using System.Linq;
using Microsoft.Crm.Services.Utility;
using Microsoft.Xrm.Sdk.Metadata;
using CrmSvcUtilExtensions.Config;
using System.Collections;
using System.Collections.Generic;
using CrmSvcUtilExtensions.Helpers;

namespace CrmSvcUtilExtensions
{
    /// <summary>
    /// Sample extension for the CrmSvcUtil.exe tool that generates early-bound
    /// classes for custom entities.
    /// </summary>
    public sealed class BasicFilteringService : ICodeWriterFilterService
    {
        CrmSvcUtilFiltersConfig _filterConfig;

        public BasicFilteringService(ICodeWriterFilterService defaultService)
        {
            this.DefaultService = defaultService;
            _filterConfig = (new FilterDataHelper()).LoadFilterData();
        }

        private ICodeWriterFilterService DefaultService { get; set; }

        bool ICodeWriterFilterService.GenerateAttribute(AttributeMetadata attributeMetadata, IServiceProvider services)
        {
            return this.DefaultService.GenerateAttribute(attributeMetadata, services);
        }

        bool ICodeWriterFilterService.GenerateEntity(EntityMetadata entityMetadata, IServiceProvider services)
        {
            if (!_filterConfig.Entities.Entity.Any(entity => string.Equals(entity, entityMetadata.LogicalName, StringComparison.InvariantCultureIgnoreCase)))
                return false;

            return this.DefaultService.GenerateEntity(entityMetadata, services);
        }

        bool ICodeWriterFilterService.GenerateOption(OptionMetadata optionMetadata, IServiceProvider services)
        {
            return this.DefaultService.GenerateOption(optionMetadata, services);
        }

        bool ICodeWriterFilterService.GenerateOptionSet(OptionSetMetadataBase optionSetMetadata, IServiceProvider services)
        {
            return this.DefaultService.GenerateOptionSet(optionSetMetadata, services);
        }

        bool ICodeWriterFilterService.GenerateRelationship(RelationshipMetadataBase relationshipMetadata, EntityMetadata otherEntityMetadata,
        IServiceProvider services)
        {
            return this.DefaultService.GenerateRelationship(relationshipMetadata, otherEntityMetadata, services);
        }

        bool ICodeWriterFilterService.GenerateServiceContext(IServiceProvider services)
        {
            return this.DefaultService.GenerateServiceContext(services);
        }
    }
}