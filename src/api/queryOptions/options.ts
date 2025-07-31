import check from "./Partners/check"

import search from "./Public/search"
import suggestedSearches from "./Public/suggested-searches"

import insights from "./Suggerence/insights"

export default {
    partners: {
        check
    },

    public: {
        'suggested-searches': suggestedSearches,
        search: search
    },

    suggerence: {
        insights: insights
    }
}