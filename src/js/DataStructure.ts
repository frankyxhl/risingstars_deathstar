interface Project{
    created_at: string
    delta: number
    description: string
    full_name: string
    monthly: number[]
    name: string
    owner_id: number
    stars: number
    tags: string[]
    url: string
    icon?:string
    logo?:string // Used in d3.js to add risingstar2017 logo
    notHighlight:boolean  // Used in d3.js to filter highlight data
}


export {
    Project
}
