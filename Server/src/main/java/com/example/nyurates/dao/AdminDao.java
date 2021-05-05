package com.example.nyurates.dao;

import com.example.nyurates.entity.Admin;

public interface AdminDao {
    public Admin adminBundle(Admin admin);
    public boolean searchProfessorByEmail(String professor_email);
    public boolean adminDeleteComment(int comment_id);
}
