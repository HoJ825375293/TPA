package com.pigeonhouse.travelhelper.service;


import com.pigeonhouse.travelhelper.entity.*;

import java.util.Date;
import java.util.List;
/**
 * @Author: XueXiaoYue
 * @Date: 2019/6/1 16:20
 */
public interface IProcessor {
    /**
     * 处理用户查询请求,返回可用酒店信息
     * @param city
     * @param RequestStartTime
     * @param RequestEndTime
     * @return
     */
    List<Hotel> queryHotelProcessor(String city, Date RequestStartTime, Date RequestEndTime);

    /**
     * 根据二次传回的酒店信息找到可用的房间信息
     * @param hotelId
     * @param RequestStartTime
     * @param RequestEndTime
     * @return
     */
    List<Room> queryRoomProcessor(int hotelId, Date RequestStartTime, Date RequestEndTime);


    /**
     * 处理用户查询车票请求
     * @param transportType
     * @param RequestStartTime
     * @param RequestEndTime
     * @return
     */
    List<Transport> queryTicketProcessor(String transportType, Date RequestStartTime, Date RequestEndTime);

    /**
     * 处理预订请求，插入数据至数据库
     * @param order
     * @return
     */
    Boolean orderProcessor(Order order);

    /**
     * 处理预订车票/飞机票请求，插入数据至数据库
     * @param ticketOrder
     * @return
     */
    Boolean ticketOrderProcessor(TicketOrder ticketOrder);

    /**
     * test
     * @return
     */
    List<Hotel> test();
}
