package com.example.tree;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    
    @GetMapping
    public List<Member> getMembers() {
        return memberService.getMembers();
    }

    @PostMapping
    public void addMember(@RequestBody Member member) {
        memberService.insertMember(member);
    }

    @DeleteMapping
    public void deleteMember(@RequestBody Member member) {
        memberService.deleteMember(member);
    }
}
