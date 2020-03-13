package com.pigeonhouse.travelhelper.controller;

import com.pigeonhouse.travelhelper.entity.Hotel;
import com.pigeonhouse.travelhelper.entity.Room;
import com.pigeonhouse.travelhelper.service.impl.Processor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/14 13:27
 */
@CrossOrigin(origins="*")
@RestController
public class HandleRoomQuery {

    @Autowired
    private Processor processor;

    @RequestMapping("/roomQuery")
    public List<Room> query(HttpServletRequest request) throws Exception {

        int hotelId = Integer.valueOf(request.getParameter("hotelId"));
        System.out.println("---------------hotelId------------");
        System.out.println(hotelId);
        String startTime = request.getParameter("startTime")+" 14:00:00";
        String endTime = request.getParameter("endTime")+" 10:00:00";

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date RequestStartTime = dateFormat.parse(startTime);
        Date RequestEndTime = dateFormat.parse(endTime);

        List<Room> room = processor.queryRoomProcessor(hotelId,RequestStartTime,RequestEndTime);
        return room;
    }

}
