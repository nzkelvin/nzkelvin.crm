using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Text;
using System.Threading.Tasks;

namespace NzKelvin.Crm.Common.Cache
{
    public interface ICache
    {
        void Add<T>(string key, T value);
        void Add<T>(string key, T value, CacheItemPolicy cachePolicy);
        T Get<T>(string key);
    }

    public static class CacheExtensions
    {
        private static string TRANSACTION_LOCK_PREFIX = "cacheItemTransactionLock_";

        public static Func<TArg, TResult> Retrieve<TArg, TResult>(this ICache cacheService,
                                                                    Func<TArg, string> createCacheKey,
                                                                    Func<TArg, TResult> getItem)
        {
            return arg =>
            {
                var key = createCacheKey(arg);
                var lockKey = TRANSACTION_LOCK_PREFIX + key;

                var value = cacheService.Get<TResult>(key);
                if (value == null)
                {
                    var lockObj = GetTransactionLockObject(lockKey, cacheService); // Garenteed fast
                    lock (lockObj)
                    {
                        if (value == null)
                        {
                            value = getItem(arg); // execution time of getItem is unknown, Potentially can be very lone.
                            cacheService.Add<TResult>(key, value);
                        }
                    }
                }

                return value;
            };
        }

        private static Object GetTransactionLockObject(string lockObjKey, ICache cacheService)
        {
            var lockObj = cacheService.Get<Object>(lockObjKey);
            if (lockObj != null)
                return lockObj;

            lockObj = new Object();
            cacheService.Add(lockObjKey, lockObj);
            return lockObj;
        }
    }
}
