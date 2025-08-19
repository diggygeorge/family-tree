package com.example.tree;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    
    @GetMapping("/members")
    public List<Member> getMembers() {
        return memberService.getMembers();
    }

    @PostMapping("/members")
    public void addMember(@RequestBody Member member) {
        memberService.insertMember(member);
    }

    @DeleteMapping("/members")
    public void deleteMember(@RequestBody Member member) {
        memberService.deleteMember(member);
    }
}
