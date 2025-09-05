package com.example.tree;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api")
public class NodeController {

    private final NodeService nodeService;

    public NodeController(NodeService nodeService) {
        this.nodeService = nodeService;
    }
    
    @GetMapping("/nodes")
    public List<Node> getNodes() {
        return nodeService.getNodes();
    }

    @PostMapping("/nodes/{id}/child")
    public void addChild(@PathVariable Integer id) {
        nodeService.addNode(id);
    }

    @PutMapping("/nodes")
    public void updateNode(@RequestBody Node node) {
        nodeService.saveNode(node);
    }

    @PostMapping("/nodes")
    public void addRoot(@RequestBody Node node) {
        nodeService.saveNode(node);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNode(@PathVariable Integer id) {
        nodeService.deleteNode(id);
    }
}
