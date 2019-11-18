package com.pigeonhouse.travelhelper.entity;
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
public class Member {
    private int memberId;
    private String name;
    private String telephone;
    private String idCardNumber;
    private String passCode;

    public Member(String name, String telephone, String idCardNumber, String passCode) {
        this.name = name;
        this.telephone = telephone;
        this.idCardNumber = idCardNumber;
        this.passCode = passCode;
    }

    public Member(){}

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getIdCardNumber() {
        return idCardNumber;
    }

    public void setIdCardNumber(String idCardNumber) {
        this.idCardNumber = idCardNumber;
    }

    public String getPassCode() {
        return passCode;
    }

    public void setPassCode(String passCode) {
        this.passCode = passCode;
    }
}
