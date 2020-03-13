package com.pigeonhouse.travelhelper.controller;

import com.pigeonhouse.travelhelper.entity.TicketOrder;
import com.pigeonhouse.travelhelper.service.impl.Processor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @Author: LanZeJun
 * @Date: 2019/6/10 21:18
 */

@CrossOrigin(origins="*")
@RestController
public class SubmitTicketOrder {
    @Autowired
    private Processor processor;

    @RequestMapping("/ticketOrder")
    public Boolean TicketOrder(HttpServletRequest request) throws Exception{

        String transportType = request.getParameter("transportType");
        String transportId = request.getParameter("transportId");
        String telephone = request.getParameter("telephone");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        Date departureTime = dateFormat.parse(SubmitTicketOrder.setCreateTime(request.getParameter("startTime")));
        Date arrivalTime = dateFormat.parse(SubmitTicketOrder.setCreateTime(request.getParameter("endTime")));

        TicketOrder ticketOrder = new TicketOrder(telephone, transportType, transportId, departureTime, arrivalTime);
        ticketOrder.toString();

        return processor.ticketOrderProcessor(ticketOrder);
    }

    public static String setCreateTime(String createTime) {
        //注意格式化的表达式
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
        try {
            Date time = format.parse(createTime);
            String date = time.toString();
            SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", java.util.Locale.US);
            Date datetime = sdf.parse(date);
            /*datetime = new java.sql.Date(datetime.getTime());*/
            String formatStr2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(datetime);
            return formatStr2;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return createTime;
    }
}
