import Partners from "@/api/Partners";
import { queryOptions } from "@tanstack/vue-query";

export default (partnerUUID: string) =>
{
    return queryOptions({
        queryKey: ['partners', 'check', partnerUUID],
        queryFn: () => Partners.check(partnerUUID),
        enabled: !!partnerUUID
    })
}