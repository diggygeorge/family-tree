package com.example.tree;

import org.antlr.v4.runtime.tree.Tree;
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
        nodeService.addChild(id);
    }

    @PutMapping("/nodes/{id}/connect/{other}")
    public void addConnection(@PathVariable Integer id, @PathVariable Integer other) {
        nodeService.addConnection(id, other);
    }

    @PutMapping("/nodes")
    public void updateNode(@RequestBody Node node) {
        nodeService.saveNode(node);
    }

    @PostMapping("/nodes")
    public void addRoot(@RequestBody Node node) {
        nodeService.addNode(node);
    }

    @DeleteMapping("/nodes/delete/{id}/connect/{other}")
    public void removeConnection(@PathVariable Integer id, @PathVariable Integer other) {
        nodeService.removeConnection(id, other);
    }

    @DeleteMapping("nodes/delete/{id}")
    public void deleteNode(@PathVariable Integer id) {
        nodeService.deleteNode(id);
    }
}
