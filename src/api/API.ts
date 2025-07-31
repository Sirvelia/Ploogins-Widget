import { useQuery } from "@tanstack/vue-query";
import type { UseQueryReturnType } from "@tanstack/vue-query";
import { unref, type MaybeRefOrGetter, computed } from "vue";

import options from "./queryOptions/options";

class API {
    // Abstract method to query the API
    static query = (path: string, params: MaybeRefOrGetter<Record<string, any>> = {}): UseQueryReturnType<any, Error> =>
    {
        const queryOptionsFn = API.resolveQueryOptions(path, options);

        const computedOptions = computed(() => {
            // If params is a function, call it inside the computed to track its reactive dependencies
            const resolvedParams = typeof params === 'function' ? params() : unref(params);
            return queryOptionsFn(resolvedParams);
        });

        return useQuery(computedOptions);
    }

    // Resolve the query options for the API
    static resolveQueryOptions = (path: string, options: Record<string, any> = {}) =>
    {
        const paths = path.split('/');
        
        // Navigate through the options object using the path
        let current: any = options;
        
        for (const pathSegment of paths) {
            if (current && typeof current === 'object' && pathSegment in current) {
                current = current[pathSegment];
            } else {
                throw new Error(`Query option not found for path: ${path}`);
            }
        }
        
        // Check if the final value is a function that returns UseQueryOptions
        if (typeof current === 'function') {
            return current;
        } else {
            throw new Error(`Invalid query option at path: ${path}. Expected a function.`);
        }
    }
}

export default API;