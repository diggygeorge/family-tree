package com.example.tree;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api")
public class RelationshipController {
    private final RelationshipService relationshipService;

    public RelationshipController(RelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }
    
    @GetMapping("/relationships")
    public List<Relationship> getRelationships() {
        return relationshipService.getRelationships();
    }
}
