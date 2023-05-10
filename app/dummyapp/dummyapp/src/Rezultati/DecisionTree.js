
import Tree from 'react-d3-tree';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import './button-style.css';
import './tree-style.css';

const DecisionTree = ({ treeData }) => {
  const containerStyles = {
    width: '100%',
    height: '400px',
  };

  const [selectedNode, setSelectedNode] = useState(null);
  
  
  
  const handleButtonClick = () => {
   
  };


   //parser za /tree
   const createBinaryTree = (treeData) => {
    const rootNode = createNode(0,false);
    return rootNode;

    function createNode(index,collaps) {
      const node = treeData.nodes[index];
      const value = treeData.values[index][0][0];

      if (node[0] === -1 && node[1] === -1) {
        return {
          name: `Leaf Node (${value})`,
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
          _collapsed: true,

        };
      } else {
        const leftChild = createNode(node[0],false);
        const rightChild = createNode(node[1],true);

        return {
          name: `Node (${value})`,
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
          children: [leftChild, rightChild],
          _collapsed: collaps,

          
          
        };
      }
    }
  };
  const binaryTreeData = createBinaryTree(treeData.tree_);
  console.log(binaryTreeData);
  

// ob kliku na nek node se pokazejo alternative temu node 
  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
    console.log('Node clicked:', nodeData);

    const parent = nodeData.parent;
    console.log("parID", parent);
    if (parent) {
      const children = parent.children;
      if (children) {
        const childrenToRender = children.map((child) => (
          <div >
            
          <button 
          className="button button-hover button-active" 
          onClick={handleButtonClick}>

          {child.data.name}
          </button>
          
          </div>
        ));

        const otherDiv = document.getElementById('alternative');
        ReactDOM.render(
          <div>
            <h3>alternative so:</h3>
            {childrenToRender}
          </div>,
          otherDiv
        );
      }
    }
  };

  
/*
  const findBranch = (treeData1, leafValue) => {
  const findNode = (node, branch = []) => {
    if (node.name === leafValue) {
      return [...branch, node];
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const foundBranch = findNode(node.children[i], [...branch, node]);
        if (foundBranch) {
          return foundBranch;
        }
      }
    }

    return null;
  };

  return findNode(treeData1);
};

  const branch = findBranch(binaryTreeData,"Leaf Node (2)");
  console.log(branch);


  */
 //ni uporabljeno, se lahko uporabi za drugacen izgled drevesa
  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <rect width="20" height="20" x="-10"  />
      <text fill="black" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes.keyA && (
        <text fill="gray" x="20" dy="20" strokeWidth="1">
          dodatni podatki: {nodeDatum.attributes.keyA}
        </text>
      )}
      
    </g>
  );


  //tooltip se ne dela
  const [nodeInfo, setNodeInfo] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });


  const handleNodeMouseOver = (nodeData, event) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const containerScrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const containerScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const tooltipX = event.clientX - containerRect.left + containerScrollLeft;
    const tooltipY = event.clientY - containerRect.top + containerScrollTop;
  
    setNodeInfo(nodeData.data.attributes.keyB);
    setTooltipPosition({ x: tooltipX, y: tooltipY });
  };
  

  const handleNodeMouseOut = () => {
    console.log("mouse out");

    setNodeInfo(null);
  };

  //useCollapseData ne dela ker ni react-d3-tree-advanced
  return (
    
    <div style={containerStyles}>
      <Tree data={binaryTreeData} 
      orientation="vertical" 
      translate={{ x: 300, y: 150 }} 
      zoom={0.6} 
      useCollapseData={true}
      collapsible={true}
      onNodeClick={handleNodeClick} 
      rootNodeClassName="node__root"
      branchNodeClassName="node__branch"
      leafNodeClassName="node__leaf"
     //renderCustomNodeElement={renderRectSvgNode}
      onNodeMouseOver={handleNodeMouseOver}
      onNodeMouseOut={handleNodeMouseOut}
      />
       {nodeInfo && (
        <div
          className="tooltip"
          style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
        >
          {nodeInfo}
        </div>
      )}
    </div>
  );
};

export default DecisionTree;
