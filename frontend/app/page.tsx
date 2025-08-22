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
          <div key={member.id} className="border-2 border-white p-2 mb-2">
            <p onClick={() => setSelectedId(member.id)}>{member.personName}</p>
            <label>Update New Name:</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />

            <label>Update Birth Date:</label>
            <input value={newBirthDate} onChange={(e) => setNewBirthDate(e.target.value)} />

            <label>Update Death Date:</label>
            <input value={newDeathDate} onChange={(e) => setNewDeathDate(e.target.value)} />

            <label>Update Prefix:</label>
            <input value={newPrefix} onChange={(e) => setNewPrefix(e.target.value)} />

            <label>Update Sex:</label>
            <input value={newSex} onChange={(e) => setNewSex(e.target.value)} />

            <button
              onClick={() =>
                actions.saveMember(
                  member.parentId,
                  newName,
                  member.treeName,
                  true,
                  member.isRoot,
                  newBirthDate,
                  newDeathDate,
                  newPrefix,
                  newSex,
                  member.id
                )
              }
            >
              Update
            </button>
            <button onClick={() => actions.deleteMember(member.id)}>Delete</button>
          </div>
        ))}

        <p>Number of Members: {members.length}</p>
        <div className="flex flex-col gap-2">
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Birth Date:</label>
          <input value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

          <label>Death Date:</label>
          <input value={deathDate} onChange={(e) => setDeathDate(e.target.value)} />

          <label>Prefix:</label>
          <input value={prefix} onChange={(e) => setPrefix(e.target.value)} />

          <label>Sex:</label>
          <input value={sex} onChange={(e) => setSex(e.target.value)} />
        </div>

        <p>Selected Id: {selectedId ? selectedId : "None"}</p>
        <button
          onClick={() =>
            actions.saveMember(
              selectedId,
              name,
              "Ammanathu",
              false,
              members.length > 0 ? true : false,
              birthDate,
              deathDate,
              prefix,
              sex
            )
          }
        >
          Add Member
        </button>
      </main>
    </div>
  );
}
