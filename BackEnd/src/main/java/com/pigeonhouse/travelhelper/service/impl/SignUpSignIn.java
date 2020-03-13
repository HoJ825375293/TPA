package com.pigeonhouse.travelhelper.service.impl;

import com.pigeonhouse.travelhelper.dao.SqlMapper;
import com.pigeonhouse.travelhelper.entity.Member;
import com.pigeonhouse.travelhelper.service.ISignUpSignIn;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
@Mapper
@Repository
public class SignUpSignIn implements ISignUpSignIn {
    @Autowired
    private SqlMapper sqlMapper;

    @Override
    public Boolean checkTel(String telephone) {
        List<Member> member =  sqlMapper.selectMemberByTel(telephone);
        return member.size()==0 ? true : false;
    }

    public Boolean checkID(String idCardNumber) {
        List<Member> member =  sqlMapper.selectMemberByTel(idCardNumber);
        return member.size()==0 ? true : false;
    }

    @Override
    public Boolean checkPassCode(String telephone,String passCode) {
        List<Member> member =  sqlMapper.selectMemberByTel(telephone);
        if(member.size() > 0){
            return member.get(0).getPassCode().equals(passCode);
        }
        return false;
    }

    @Override
    public Boolean register(String name, String telephone, String idCardNumber,String passCode) {
        if(checkTel(telephone) && checkID(idCardNumber)) {
            sqlMapper.insertMember(new Member(name, telephone, idCardNumber, passCode));
            return true;
        }
        return false;
    }
}
