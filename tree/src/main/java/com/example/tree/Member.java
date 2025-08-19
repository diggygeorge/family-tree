package com.example.tree;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Member {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer parent_id;
    private String person_name;
    private String tree_name;

    public Member() {
    }

    public Member(Integer id, Integer parent_id, String person_name, String tree_name) {
        this.id = id;
        this.parent_id = parent_id;
        this.person_name = person_name;
        this.tree_name = tree_name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parent_id;
    }

    public void setParentId(Integer id) {
        this.parent_id = id;
    }

    public String getPersonName() {
        return person_name;
    }

    public void setPersonName(String person_name) {
        this.person_name = person_name;
    }

    public String getTreeName() {
        return tree_name;
    }

    public void setTreeName(String tree_name) {
        this.tree_name = tree_name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Member that = (Member) o;

        return Objects.equals(id, that.id)
        && Objects.equals(parent_id, that.parent_id)
        && Objects.equals(person_name, that.person_name)
        && Objects.equals(tree_name, that.tree_name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, parent_id, person_name, tree_name);
    }

}
