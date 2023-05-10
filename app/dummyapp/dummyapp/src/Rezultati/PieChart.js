import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

const MyPieChart = ({ treeData }) => {
  console.log(treeData);

  
  //parser za /tree
  const createData = (treeData) => {
    const dat=[]
    createNode(0,dat);
    return dat;

    function createNode(index,dat) {
      const node = treeData.nodes[index];
      const value = treeData.values[index][0][0];

      if (node[0] === -1 && node[1] === -1) {
        dat.push({ name: `postopek (${value})`, value: value });
        return;
        
      } else {
        dat.push({ name: `postopek (${value})`, value: value });

        createNode(node[0],dat);

      }
    }
  };
  const data = createData(treeData.tree_);
  console.log(data)


  const colors = ['#27f0ff', '#257d8a', '#0bc4bd', '#FFFF00', '#FF00FF', '#00FFFF'];
  return (
    
    

      <RechartsPieChart  width={400} height={400}>
      <Pie
        data={data} 
        dataKey="value" 
        nameKey="name">

          {data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> 
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
        <Legend />
        <Label value="My Chart Title" position="top" />
      </RechartsPieChart>
    
  );
}

export default MyPieChart;
