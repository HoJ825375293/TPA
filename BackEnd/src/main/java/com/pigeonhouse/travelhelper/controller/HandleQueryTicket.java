package com.pigeonhouse.travelhelper.controller;

import com.pigeonhouse.travelhelper.entity.Transport;
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
 * @Author: LanZeJun
 * @Date: 2019/6/11 15:51
 */
@CrossOrigin(origins="*")
@RestController
public class HandleQueryTicket {

    @Autowired
    private Processor processor;

    @RequestMapping("/queryTicket")
    public List<Transport> queryTicket(HttpServletRequest request) throws Exception {

        String transportType = request.getParameter("transportType");
        String startTime = request.getParameter("travelTime")+" 00:00:00";
        String endTime = request.getParameter("travelTime")+" 23:59:59";

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date RequestStartTime = dateFormat.parse(startTime);
        Date RequestEndTime = dateFormat.parse(endTime);

        List<Transport> result = processor.queryTicketProcessor(transportType,RequestStartTime,RequestEndTime);
        return result;
    }
}