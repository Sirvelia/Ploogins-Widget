import Public from "@/api/Public"
import { ONE_HOUR } from "@/constants/time";
import { queryOptions } from "@tanstack/vue-query"

export default (args: { query: string, partner_uuid: string }) =>
{
    return queryOptions({
        queryKey: ['public', 'search', args.query, args.partner_uuid],
        queryFn: () => Public.search(args.query, args.partner_uuid),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!args.query && !!args.partner_uuid,
        staleTime: ONE_HOUR,
        gcTime: ONE_HOUR
    })
}