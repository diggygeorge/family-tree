'use client'
import * as actions from '../actions';
import { useState, useEffect } from 'react'

interface Member {
   id: number,
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

  useEffect(() => {
    fetchData();
  }, [actions.deleteMember, actions.saveMember]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Members:</p>
        {members.map((member) => (
          <>
            <p className="border-2 border-white" onClick={() => setSelectedId(member.id)}key={member.id}>{member.personName}</p>
            <label>Update New Name:</label>
            <input onChange={(e) => setNewName(e.target.value)}></input>
            <button onClick={() => actions.saveMember(member.parentId, newName, member.treeName, true, member.isRoot, newBirthDate, newDeathDate, newPrefix, newSex, member.id)}>Update</button>
            <button onClick={() => actions.deleteMember(member.id)}>Delete</button>
          </>
        ))}
        <p>Number of Members: {members.length}</p>
        <div>
          <label>Name:</label>
          <input onChange={(e) => setName(e.target.value)}/>
        </div>
        <p>Selected Id: {selectedId ? selectedId : "None"}</p>
        <button onClick={() => actions.saveMember(selectedId, name, "Ammanathu", false, members.length > 0 ? true : false, birthDate, deathDate, prefix, sex)}>Add Member</button>

      </main>
    </div>
  );
}
