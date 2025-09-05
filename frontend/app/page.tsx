'use client'
import * as actions from '../actions';
//import FamilyTree from '../components/familytree';
import { useState, useEffect } from 'react'



export type Relationship = {
  id: number,
  from: Node,
  to: Node,
}

interface Node {
   id: number,
   relationships: Relationship[],
   isRoot: boolean,
   description: string,
   title: string
}

export default function Home() {

  const [nodes, setNodes] = useState<Node[]>([])
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")

  const [newDescription, setNewDescription] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [thisId, setThisId] = useState<number | null>(null)
  const [otherId, setOtherId] = useState<number | null>(null)

  const fetchData = async () => {
    const nodeList: Node[] = await actions.getNodes();
    setNodes(nodeList);
  }

  const vertices = [
  { id: "1", name: "Danny" },
  { id: "2", name: "Mother of Danny" },
  { id: "3", name: "Father of Danny" }
];

const edges = [
  { source: "1", target: "2"},
  { source: "1", target: "3"}
];

  const insertInfo = function (nodes: Node[]) {
    for (const node of nodes) {
      vertices.push({
        id: node.id.toString(),
        name: node.title
      })

      for (const relationship of node.relationships) {
        edges.push({
          source: relationship.from.toString(),
          target: relationship.to.toString()
        })
      }
    }
  }

  const FamilyData = {
    nodes: vertices,
    links: edges
  }

  useEffect(() => {
    fetchData();
    console.log(vertices)
    console.log(edges)
  }, [actions.deleteNode, actions.saveNode, actions.addConnection]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="">
          <h1>Family Tree</h1>
          
        </div>
        
        <p>Members:</p>
        {nodes.map((node) => (
          <div key={node.id}>
            <p className="border-2 border-white" onClick={() => setSelectedId(node.id)}>{node.title}</p>
            <label>Update New Title:</label>
            <input onChange={(e) => setNewTitle(e.target.value)}></input>
            <button onClick={() => actions.saveNode(node.relationships, newTitle, newDescription, true, node.id)}>Update</button>
            <button onClick={() => actions.deleteNode(node.id)}>Delete</button>
          </div>
        ))}
        <p>Number of Members: {nodes.length}</p>
        <div className="flex flex-col">
          <input onChange={(e) => setThisId(e.target.value as unknown as number)}></input>
          <input type="number" onChange={(e) => setOtherId(e.target.value as unknown as number)}></input>
          <button onClick={() => actions.addConnection(thisId, otherId)}>Add Connection</button>
        </div>
      </main>
    </div>
  );
}
