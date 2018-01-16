import '../css/styles.css'

// production mode
import Vue from 'vue/dist/vue.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// development mode
import fs from 'fs'
import * as d3 from "d3"
import * as R from "ramda"
import { D3Nodes } from "./D3Nodes"
import {
    ProjectsData,
    featuredTagList
} from "./ProjectsData"
import { Photoshop } from "./vue-color.min.js"
import risingStarLogoPng from "../images/risingstar2017logo.svg";
import { saveSvgAsPng } from "save-svg-as-png"

const path2017 = "src/data/2017/projects.json"
const projectsDataString2017 = fs.readFileSync(path2017, 'utf8')
const rawProjectsData2017 = JSON.parse(projectsDataString2017)

const path2016 = "src/data/2016/projects.json"
const projectsDataString2016 = fs.readFileSync(path2016, 'utf8')
const rawProjectsData2016 = JSON.parse(projectsDataString2016)

const risingStarLogo = {
    "created_at": "2016-01-01T05:29:23.000Z",
    "delta": 250000,
    "description": "JS RisingStars 2017",
    "full_name": "JS RisingStars 2017",
    "monthly": [],
    "name": "JS RisingStars 2017",
    "owner_id": 5546996,
    "stars": 250000,
    "logo": risingStarLogoPng,
    "tags": ["risingstar"],
    "url": "http://risingstars2017.js.org"
}

const dataSource =  {
    "2017": R.prop("projects", rawProjectsData2017),
    "2016": R.prop("projects", rawProjectsData2016)
}

Vue.use(ElementUI)

const app = new Vue({
    el: '#app',
    components: {
        'photoshop-picker': Photoshop  // Datapicker components
    },
    data: {
        dataSourcePicker: "2017",
        allOrFeatured: "all",
        // sumBy: Default use delta, another choice is "stars"
        // This decides circle's radis
        sumBy: "delta",
        ifAddLogo: "noAdd",
        circleColor: {
            hex: '#ffffff' // Default background color: white
        },
        backgroundColor: {
            hex: "#EDEFED" // Default background color: grey
        },
        filterWord: null,
        highlightWord: null
    },
    computed:{
        tags(){
            const getDataByChosenYear = R.prop(this.dataSourcePicker, dataSource)
            return new ProjectsData(getDataByChosenYear).uniqueTagList()
        }
    },
    created(){
        this.render()
        document.body.style.backgroundColor = this.backgroundColor.hex
    },
    watch: {
        circleColor(color) {
            new D3Nodes().changeBackgroundColor(color.hex)
        },
        backgroundColor(color){
            document.body.style.backgroundColor = color.hex
        },
        dataSourcePicker(){
            this.render()
        },
        sumBy(){
            this.render()
        },
        ifAddLogo(){
            this.render()
        },
        allOrFeatured(){
            this.render()
        }
    },
    methods: {
        chosen(tagName){
            return  tagName === this.highlightWord ? "success" : ""
        },
        render(){
            const getDataByChosenYear = R.prop(this.dataSourcePicker, dataSource)
            let data = new ProjectsData(getDataByChosenYear)
            if (this.allOrFeatured === "featured"){
                data.filterInFeaturedTagList()
            }
            if (this.ifAddLogo === "add"){
                data.addRisingStarsLogo(risingStarLogo)
            }
            let ifHighlight = false
            if (this.highlightWord){
                ifHighlight = true
                data.highlightByTagName(this.highlightWord)
            }
            new D3Nodes(data.value()).render(this.circleColor.hex, this.sumBy, ifHighlight)
        },
        // Not used right now
        filterData(tagName){
            this.filterWord = tagName
            this.render()
        },

        highlightData(tagName){
            this.highlightWord = tagName
            this.render()
        },

        save(){
            saveSvgAsPng(document.getElementById("d3"), "risingStar2017DeathStar.png")
        }
    }
})
