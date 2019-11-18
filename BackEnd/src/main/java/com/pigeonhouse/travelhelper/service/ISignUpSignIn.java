package com.pigeonhouse.travelhelper.service;
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
public interface ISignUpSignIn {
    /**
     * 检查数据库内是否存在该telephone对应的用户
     * @param telephone
     * @return
     */
    Boolean checkTel(String telephone);


    /**
     * 根据手机号检查密码是否正确,不正确或不存在该用户都返回false
     * @param telephone
     * @param passCode
     * @return
     */
    Boolean checkPassCode(String telephone,String passCode);


    /**
     * 注册
     * @param name
     * @param telephone
     * @param idCardNumber
     * @param passCode
     * @return
     */
    Boolean register(String name,String telephone,String idCardNumber,String passCode);
}
