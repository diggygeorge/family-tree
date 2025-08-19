package com.example.tree;

import java.util.List;

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

    public void insertMember(Member member) {
        memberRepository.save(member);
    }

    public Member deleteMember(Member member) {
        memberRepository.delete(member);
        return member;
    }

}
