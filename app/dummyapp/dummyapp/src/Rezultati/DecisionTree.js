import React from 'react';
import Tree from 'react-d3-tree';

const DecisionTree = ({ treeData }) => {
  const containerStyles = {
    width: '100%',
    height: '800px',
  };

   const handleNodeClick = (nodeData) => {
    console.log('Node clicked:', nodeData);
    
  };
/*
  const findBranch = (treeData, leafValue) => {
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

  return findNode(treeData);
};

  const branch = findBranch(treeData,"Lef Node (2)");
*/
  const createBinaryTree = (treeData) => {
    const rootNode = createNode(0);
    return rootNode;

    function createNode(index) {
      const node = treeData.nodes[index];
      const value = treeData.values[index][0][0];

      if (node[0] === -1 && node[1] === -1) {
        return {
          name: `Leaf Node (${value})`,
        };
      } else {
        const leftChild = createNode(node[0]);
        const rightChild = createNode(node[1]);

        return {
          name: `Node (${value})`,
          children: [leftChild, rightChild],
        };
      }
    }
  };
  const binaryTreeData = createBinaryTree(treeData.tree_);
  console.log(treeData.tree_);

  return (
    <div style={containerStyles}>
      <Tree data={binaryTreeData} 
      orientation="vertical" 
      translate={{ x: 300, y: 150 }} 
      zoom={0.6} 
      collapsible={false} 
      onNodeClick={handleNodeClick} />
    </div>
  );
};

export default DecisionTree;
