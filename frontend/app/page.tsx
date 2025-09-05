'use client'
import * as actions from '../actions';
import FamilyTree from '../components/familytree';
import { useState, useEffect } from 'react'



export type Relationship = {
  id: number,
  from: Member,
  to: Member,
  type: string
}

interface Member {
   id: number,
   relationships: Relationship[],
   parentId: number,
   isRoot: boolean,
   personName: string,
   treeName: string,
   birthDate: string,
   deathDate: string,
   prefix: string,
   sex: string
}

export default function Home() {

  const [members, setMembers] = useState<Member[]>([])
  const [name, setName] = useState<string>("")
  const [birthDate, setBirthDate] = useState("")
  const [deathDate, setDeathDate] = useState("")
  const [prefix, setPrefix] = useState("")
  const [sex, setSex] = useState("")

  const [newName, setNewName] = useState("")
  const [newBirthDate, setNewBirthDate] = useState("")
  const [newDeathDate, setNewDeathDate] = useState("")
  const [newPrefix, setNewPrefix] = useState("")
  const [newSex, setNewSex] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const fetchData = async () => {
    const memberList: Member[] = await actions.getMembers();
    setMembers(memberList);
  }

  const nodes = [
  { id: "1", name: "Danny" },
  { id: "2", name: "Mother of Danny" },
  { id: "3", name: "Father of Danny" }
];

const links = [
  { source: "1", target: "2", type: "PARENT" },
  { source: "1", target: "3", type: "PARENT" }
];

  const insertInfo = function (members: Member[]) {
    for (const member of members) {
      nodes.push({
        id: member.id.toString(),
        name: member.personName
      })

      for (const relationship of member.relationships) {
        links.push({
          source: relationship.from.toString(),
          target: relationship.to.toString(),
          type: relationship.type
        })
      }
    }
  }

  const FamilyData = {
    nodes: nodes,
    links: links
  }

  useEffect(() => {
    fetchData();
    console.log(nodes)
    console.log(links)
  }, [actions.deleteMember, actions.saveMember, actions.addRelation]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="">
          <h1>Family Tree</h1>
          <FamilyTree />
        </div>
        
        <p>Members:</p>
        {members.map((member) => (
          <div key={member.id}>
            <p className="border-2 border-white" onClick={() => setSelectedId(member.id)}>{member.personName}</p>
            <label>Update New Name:</label>
            <input onChange={(e) => setNewName(e.target.value)}></input>
            <button onClick={() => actions.saveMember(member.parentId, member.relationships, newName, member.treeName, member.isRoot, newBirthDate, newDeathDate, newPrefix, newSex, member.id)}>Update</button>
            <button onClick={() => actions.deleteMember(member.id)}>Delete</button>
          </div>
        ))}
        <p>Number of Members: {members.length}</p>
        <div className="flex flex-col">
          <button onClick={() => actions.addRelation(selectedId, "parents")}>Add Parents</button>
          <button onClick={() => actions.addRelation(selectedId, "child")}>Add Child</button>
          <button onClick={() => actions.addRelation(selectedId, "ex")}>Add Ex</button>
          <button onClick={() => actions.addRelation(selectedId, "spouse")}>Add Spouse</button>
        </div>
      </main>
    </div>
  );
}
