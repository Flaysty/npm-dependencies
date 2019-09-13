import React from 'react'
import Graph from 'react-graph-vis'

var options = {
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000",
    }
};




export default class GraphVisualize extends React.Component {

    render() {
        const { currentPackage: { name, dependencies } } = this.props;
        let graph = {
            nodes: [],
            edges: []
        }
        if (dependencies !== undefined) {
            graph = {
                nodes: [
                    { id: name, label: name },
                    ...Object.keys(dependencies).map((key) => ({ id: `${key}${dependencies[key]}`, label: `${key} ${dependencies[key]}` }))
                ],
                edges: [
                    ...Object.keys(dependencies).map((key) => ({ from: name, to: `${key}${dependencies[key]}` }))
                  ]
            };
        }
        return (
            <>
                {dependencies && <Graph graph={graph} options={options} />}
            </>
        )
    }
}