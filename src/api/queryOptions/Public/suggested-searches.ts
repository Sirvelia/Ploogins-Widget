import Public from "@/api/Public";
import { ONE_DAY } from "@/constants/time";
import { queryOptions } from "@tanstack/vue-query";

export default () =>
{
    return queryOptions({
        queryKey: ['public', 'suggested-searches'],
        queryFn: () => Public.suggestedSearches(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: ONE_DAY,
        gcTime: ONE_DAY
    })
}