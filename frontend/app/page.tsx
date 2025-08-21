'use client'
import * as actions from '../actions';
import { useState, useEffect } from 'react'

interface Member {
   id: number,
   parentId: number,
   personName: string,
   treeName: string
}


export default function Home() {

  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [name, setName] = useState<string>("")
  const [newName, setNewName] = useState("")
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
            <button onClick={() => actions.saveMember(member.parentId, newName, member.treeName, true, member.id)}>Update</button>
            <button onClick={() => actions.deleteMember(member.id)}>Delete</button>
          </>
        ))}
        <p>Number of Members: {members.length}</p>
        <div>
          <label>Name:</label>
          <input onChange={(e) => setName(e.target.value)}/>
        </div>
        <p>Selected Id: {selectedId ? selectedId : "None"}</p>
        <button onClick={() => actions.saveMember(selectedId, name, "Ammanathu", false)}>Add Member</button>

      </main>
    </div>
  );
}
