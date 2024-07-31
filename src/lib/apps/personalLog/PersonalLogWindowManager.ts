import { OptionalDetails } from "@/src/types/apps/personal-log/Details";
import { PersonalLog } from "@/src/types/apps/personal-log/PersonalLog";
import { getLogs } from "../../requestTypes";

/**
 * Page length
 */
export function totalPages(itemsLength: number, perPage: number = 5): number {
    // Of course it's math.roof
    return Math.ceil(itemsLength / perPage);
}

export interface ItemsWindowInfo {
    // Start / End
    windowStart: number;
    windowEnd: number;
    
    page: number;
    totalPages: number;
    
    totalItems: number;
    items: number;
}

/**
 * Get a window of items in a given page
 */
export function itemsWindow(
	itemsLength: number,
	currentPage: number = 1,
	perPage: number = 5
): ItemsWindowInfo {
    const pages = totalPages(itemsLength, perPage);
    
    // Window of entities that will be shown
    const itemsWindowStart = currentPage * perPage - perPage;
    const nextWindowStart = (currentPage + 1) * perPage - perPage;
    
    // There are many ways to calculate this part
    let remainingItems = perPage;
    
    // With end
    // If the end page is greater than total pages
    // We are at the final window of entities
    if(nextWindowStart > pages) {
        // The remaining entities length is
        remainingItems = nextWindowStart - itemsWindowStart;
    }
    
    // 25 + 3 = 28
    // 25 + 5 = 30
    const itemsWindowEnd = itemsWindowStart + remainingItems;
    return {
        totalItems: itemsLength,
        windowStart: itemsWindowStart,
        windowEnd: itemsWindowEnd,
        page: currentPage,
        totalPages: pages,
        items: remainingItems,
    };
}

/**
 * Store query and page
 */
export interface QueryInfo {
	// For search
    query: string;
	// For pagination
    page: number;
}

export interface ServerQuery {
	// For search
    query: string;
	// For pagination
    page: number;
	perPage: number;
}

/**
 * Personal log window manager
 */
export default class PersonalLogWindowManager {
    queryInfo: QueryInfo;
    logs: PersonalLog<OptionalDetails>[];
    
    // Pagination
	// Total pages
    pages = 1;
    perPage: number = 5;
    
    /**
     * Constructor
     */
    constructor(typeData: {
		queryInfo?: QueryInfo,
		logs?: PersonalLog<OptionalDetails>[],
        pages?: number
	} = {
		queryInfo: {
			query: "",
			page: 1,
		},
		logs: [],
		pages: 1,
	}) {
		this.queryInfo = typeData.queryInfo ? typeData.queryInfo : {
			query: "",
			page: 1,
		};
		this.pages = typeData.pages ? typeData.pages : 0;
		this.logs = typeData.logs ? typeData.logs : [];
    }
	
    /**
     * To send to the frontend
     */
    toType() {
        return {
            queryInfo: this.queryInfo,
            logs: this.logs,
            pages: this.pages,
			perPage: this.perPage,
        };
    }
    
    /**
     * Update all
     */
    async update() {
        const logsResponse = await getLogs({
			...this.queryInfo,
			perPage: this.perPage
		});
		
		if(!logsResponse) {
			console.error("No logs");
			return;
		}
		
		const logs = logsResponse.logs;
        if(logs) {
            // Get total pages
            const pages = totalPages(logs.length, this.perPage);
            
            // Update
            this.logs = logs;
            this.pages = pages;
        }
    }
	
	/**
	 * Items window
	 */
	itemsWindow() {
		const itemsWindowInfo = itemsWindow(this.pages, this.queryInfo.page, this.perPage);
        return itemsWindowInfo;
	}
    
    // --- Query Info ---
    /**
     * Query from search params
     */
    setQueryFromSearchParams(searchParams: {
        query?: string;
        page?: string;
    }) {
        // Fetch apps
        const query = searchParams?.query || "";
        const page = Number(searchParams?.page) || 1;
        
        this.setQuery(query);
        this.setPage(page);
    }
    
    /**
     * Set query
     */
    setQuery(query: string) {
        this.queryInfo.query = query;
    }
    
    /**
     * Set page
     */
    setPage(page: number) {
        this.queryInfo.page = page;
    }
    
    // --- Pagination ---
    /**
     * Set per page
     */
    setPerPage(perPage: number) {
        this.perPage = perPage;
    }
}
