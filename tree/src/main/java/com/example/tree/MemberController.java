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
        memberService.saveMember(member);
    }

    @PutMapping("/members")
    public void updateMember(@RequestBody Member member) {
        memberService.saveMember(member);
    }

    @DeleteMapping("/delete-member/{id}")
    public void deleteMember(@PathVariable Integer id) {
        memberService.deleteMember(id);
    }
}
