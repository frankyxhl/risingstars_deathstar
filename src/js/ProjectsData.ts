import * as R from "ramda"
import { Project } from "./DataStructure"


const featuredTagList = [
    'build',
    'compiler',
    'css-in-js',
    'framework',
    'graphql',
    'ide',
    'mobile',
    'nodejs-framework',
    'react',
    'ssg',
    'test-framework',
    'vue'
]

const existsInList = l=> R.length(l) > 0

const existsInFeatureTagList = R.pipe(
    R.prop("tags"),
    R.intersection(featuredTagList),
    existsInList
)


const tagsContains = tagName => R.pipe(
    R.prop("tags"),
    R.contains(tagName)
)


class ProjectsData{
    instance:any

    constructor(data: Project[]){
        this.instance = R.clone(data)
    }

    filterInFeaturedTagList(){
        this.instance = R.filter(existsInFeatureTagList, this.instance)
        return this
    }

    filterByTagName(tagName){
        const hasTagName = tagsContains(tagName)
        this.instance = R.filter(hasTagName, this.instance)
        return this
    }

    highlightByTagName(tagName){
        this.instance = R.map((project)=>{
            project.notHighlight = R.contains(tagName, project.tags)
            return project
        }, this.instance)
        return this
    }

    addRisingStarsLogo(logoData){
        this.instance.push(logoData)
        return this
    }

    value(){
        return this.instance
    }

    uniqueTagList(){
        return R.pipe(
            R.pluck("tags"),
            R.flatten,
            R.uniq
        )(this.instance)
    }

}


export {
    ProjectsData,
    featuredTagList
}
