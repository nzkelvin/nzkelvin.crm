using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace NzKelvin.Crm.Common.Cache
{
    public class AbsoluteCache : ICache
    {
        MemoryCache _cache = MemoryCache.Default;
        CacheItemPolicy _cachePolicy;

        public AbsoluteCache()
        {
            // Setup default cache service
            _cachePolicy = new CacheItemPolicy()
            {
                AbsoluteExpiration = DateTime.Now.AddMinutes(15), // 15 Minutes
                Priority = CacheItemPriority.Default,
                RemovedCallback = null,
                UpdateCallback = null
            };
        }

        public AbsoluteCache(CacheItemPolicy cachePolicy)
        {
            _cachePolicy = cachePolicy;
        }

        public void Add<T>(string key, T value)
        {
            Add(key, value, _cachePolicy);
        }

        public void Add<T>(string key, T value, CacheItemPolicy cachePolicy)
        {
            _cache.Add(key, value, cachePolicy);
        }

        public T Get<T>(string key)
        {
            return (T)_cache.Get(key);
        }
    }
}
