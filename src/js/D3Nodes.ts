import * as d3 from "d3"
import * as R from "ramda"
import { getProjectAvatarUrl } from "./avatar"
import { Project } from "./DataStructure"

const getUrl = d => d.data.url ? d.data.url : "#"

const getFirstTagName = d => d.color_tag_name = d.data.tags
    ? R.head(d.data.tags)
    : "no_tag_name"


const showColor = (d, color) => R.has("logo", d.data)
    ? "transparent"
    : color


const color = d3.scaleOrdinal(d3.schemeCategory20)

// D3 node instance of projects
class D3Nodes{
    svg: any
    instance: any
    projects: Project[]

    constructor(data: Project[]) {
        this.svg = d3.select("svg")
        this.projects = data
    }

    removeAll(){
        this.svg
            .selectAll("*")
            .remove()
        return this
    }

    draw(color, sumWord, filterWord){
        const data = R.clone(this.projects)

        const sumBy = R.prop(sumWord)

        // Get inspired and reference from: https://bl.ocks.org/mbostock/4063269
        const width = this.svg.attr("width")
        const height = this.svg.attr("height")

        const pack = d3.pack()
            .size([width, height])
            .padding(3)

        const root = d3.hierarchy({children: data})
            .sum(sumBy)
            .each(getFirstTagName)
            .sort(function(a, b) { return sumBy(b.data) - sumBy(a.data); })

        const node = this.svg.selectAll(".node")
            .data(pack(root).leaves())
            .enter()
            .append("a")
            .attr("xlink:href", getUrl)
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`)

        node.append("circle")
            .attr("r", d => d.r)
            .style("fill", d => showColor(d, color))


        node.append("title")
            .text(function(d) {
                return d.data.name + "\n" + sumBy(d.data) +" stars in 2017"; })

        const drawImageNode = filterWord
            ? node.filter(d => d.data.notHighlight)
            : node

        drawImageNode.append("svg:image")
            .attr("xlink:href", d => getProjectAvatarUrl(d.data, d.r))
            .attr("x", d => -d.r*1.3/2)
            .attr("y", d => -d.r*1.3/2)
            .attr("height", d => d.r*1.3)
            .attr("width", d => d.r*1.3)
            .style("fill", d => d.color_tag_name)

        return this
    }

    changeBackgroundColor(color){
  	    d3.selectAll('circle')
  	        .transition()
  	        .duration(1000)
            .style("fill", color)
        return this
    }

    render(color, sumWord="delta", filterWord=null){
        this.removeAll()
            .draw(color, sumWord, filterWord)
        return this
    }


}


export {
    D3Nodes
}
