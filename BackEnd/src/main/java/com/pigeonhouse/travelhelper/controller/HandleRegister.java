package com.pigeonhouse.travelhelper.controller;

import com.pigeonhouse.travelhelper.service.ISignUpSignIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins="*")
@RestController
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
public class HandleRegister {

    @Autowired
    private ISignUpSignIn signUpSignIn;

    @RequestMapping("/check_duplicate")
    public Boolean checkMemberTel(HttpServletRequest request){
        String tel = request.getParameter("telephone");
        return signUpSignIn.checkTel(tel);
    }

    @RequestMapping("/register")
    public Boolean register(HttpServletRequest request){
        String name = request.getParameter("name");
        String telephone = request.getParameter("telephone");
        String idCardNumber = request.getParameter("idCardNumber");
        String passCode = request.getParameter("passCode");

        System.out.println(passCode);


        return signUpSignIn.register(name,telephone,idCardNumber,passCode);
    }

    @RequestMapping("/login")
    public Boolean login(HttpServletRequest request){
        String telephone = request.getParameter("telephone");
        String passCode = request.getParameter("passCode");
        return signUpSignIn.checkPassCode(telephone,passCode);
    }
}
