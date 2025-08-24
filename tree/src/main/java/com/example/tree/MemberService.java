package com.example.tree;

import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class MemberService {
    
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    public void saveMember(Member member) {
        memberRepository.save(member);
    }

    public void addParents(Integer id) {
        Member member = memberRepository.getReferenceById(id);

        Member parent1 = new Member();
        parent1.setPersonName("Mother of " + member.getPersonName());
        parent1.setSex("F");

        Member parent2 = new Member();
        parent2.setPersonName("Father of " + member.getPersonName());
        parent2.setSex("M");
        
        saveMember(parent1);
        saveMember(parent2);

        member.addRelationship(parent1, "PARENT");
        member.addRelationship(parent2, "PARENT");
        
        saveMember(member);
    }

    public void addEx(Integer id) {

        Member member = memberRepository.getReferenceById(id);

        Member ex = new Member();
        ex.setPersonName("Ex of " + member.getPersonName());

        member.addRelationship(ex, "EX");

        saveMember(ex);
        saveMember(member);

    }

    public void addSpouse(Integer id) {

        Member member = memberRepository.getReferenceById(id);

        Member spouse = new Member();
        spouse.setPersonName("Spouse of " + member.getPersonName());

        member.addRelationship(spouse, "SPOUSE");

        saveMember(spouse);
        saveMember(member);
        
    }

    public void addChild(Integer id) {

        Member member = memberRepository.getReferenceById(id);

        Member child = new Member();

        child.setPersonName("Child of " + member.getPersonName());

        member.addRelationship(child, "CHILD");

        saveMember(child);
        saveMember(member);

    }

    public void deleteMember(Integer id) {
        // delete all relationships mentioning it first, then if there are members 
        // with no more relationships, delete them entirely.  then delete member itself

        Member member = memberRepository.getReferenceById(id);

        for (Relationship r : new ArrayList<Relationship>(member.getRelationships())) {
            Member receiving_member = r.getTo();
            member.removeRelationship(r);
            for (Relationship r2 : new ArrayList<Relationship>(receiving_member.getRelationships())) {
                if (r2.getTo().equals(member)) {
                    receiving_member.removeRelationship(r2);
                    if (receiving_member.getRelationships().isEmpty()) {
                        memberRepository.delete(receiving_member);
                    }
                }
            }
        }
        memberRepository.delete(member);
    }

}
