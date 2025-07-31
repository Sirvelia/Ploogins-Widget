import Suggerence from "@/api/Suggerence"
import { ONE_HOUR } from "@/constants/time"
import { queryOptions } from "@tanstack/vue-query"

export default (args: { slug: string }) =>
{
    return queryOptions({
        queryKey: ['suggerence', 'insights', args.slug],
        queryFn: () => Suggerence.insights(args.slug),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!args.slug,
        staleTime: ONE_HOUR,
        gcTime: ONE_HOUR
    })
}