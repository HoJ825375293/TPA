package com.pigeonhouse.travelhelper.controller;

import com.pigeonhouse.travelhelper.service.impl.Processor;
import com.pigeonhouse.travelhelper.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
@CrossOrigin(origins="*")
@RestController
public class SubmitOrder {

    @Autowired
    private Processor processor;

    @RequestMapping("/order")
    public Boolean order(HttpServletRequest request) throws Exception {

        System.out.println(request.getParameter("hotelId"));
        System.out.println(request.getParameter("roomId"));
        System.out.println(request.getParameter("memberId"));
        System.out.println(request.getParameter("numberOfPeople"));


        int hotelId = Integer.valueOf(request.getParameter("hotelId"));
        int roomId = Integer.valueOf(request.getParameter("roomId"));
        String telephone = request.getParameter("telephone");
        int numberOfPeople = Integer.valueOf(request.getParameter("numberOfPeople"));

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date startTime = dateFormat.parse(request.getParameter("startTime") + " 22:00:00");
        Date endTime = dateFormat.parse(request.getParameter("endTime") + " 18:00:00");

        Order order = new Order(roomId, telephone, numberOfPeople, startTime, endTime);
        order.toString();

        return processor.orderProcessor(order);
    }
}

