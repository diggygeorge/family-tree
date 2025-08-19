'use client'
import Image from "next/image";
import * as actions from '../actions';
import { useState, useEffect } from 'react'

interface Member {
   id: number,
   parentId: number,
   personName: string,
   treeName: string
}


export default function Home() {

  const [members, setMembers] = useState<Member[]>([])

  const fetchData = async () => {
    console.log('AddUserPage:in fetchData');

    const memberList: Member[] = await actions.getMembers();

    setMembers(memberList);
  }

  useEffect(() => {
    console.log('useEffect 2');

    fetchData();
  }, []);

  useEffect(() => {
    console.log(members);
  }, [members]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p>Members:</p>
        {members.map((member) => (
          <p key={member.id}>{member.personName}</p>
        ))}
        <p>Number of Members: {members.length}</p>

      </main>
    </div>
  );
}
