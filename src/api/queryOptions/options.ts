import check from "./Partners/check"
import search from "./Public/search"
import suggestedSearches from "./Public/suggested-searches"

export default {
    partners: {
        check
    },

    public: {
        'suggested-searches': suggestedSearches,
        search: search
    }
}